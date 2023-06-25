import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { HTTP_OPTIONS } from '../urls';
import { handleError } from '../utils';
import { UserService } from './user.service';
import { CommandeGet } from '../interfaces/commandeGet';
import { ProduitFournisseur } from '../interfaces/produitFournisseur';

@Injectable({
  providedIn: 'root'
})
export class LivraisonService extends UserService {

  constructor(http: HttpClient) {
    super(http)
  }

  //permet d"avoir une liste de commande selon l'etat
 
  getAllCommandesByEtat(etatCommande:string): Observable<CommandeGet[]> {
    let url='http://127.0.0.1:8000/api/v1/supermarket/commandes';
    return this.http.get<any>(`${url}?etat_commande=${etatCommande}`).pipe(
      map((data: any) => {
        return data.results.map((item: any) => 
          new CommandeGet(
            item.id,
            item.numero_tracking,
            item.montant_ht,
            item.created_by,
            item.fournisseur, 
            item.lignes_commande, 
            item.etat_commande,
            item.created_at,
            item.slug,
            item.deleted 
          )
        );
      }),
      catchError(this.handleError)
    );
  }


  //pour changer l'etat d'une commande 
  changerEtat(parametre: string, idCommande:number): Observable<any> {
    let url=`http://localhost:8000/api/v1/supermarket/commandes/${idCommande}/${parametre}/`;
    return this.http.post<any>(
      url,
      null
    ).pipe(
    
      map(new_commande => {
        console.log(new_commande);  
        return new_commande;
      }),
      catchError(handleError)
    );
  }

 


  //recuperer tout les produits du founisseur
  getAllProduitsFournisseurs(): Observable<ProduitFournisseur[]> {
    return this.http.get<any>(this.base_supermarket_url + "supermarket/produits-fournisseur").pipe(
      map((data: any) => {
        return data.results.map((item: any) => 
          new ProduitFournisseur(
            item.id,
            item.code,
            item.nom,
            item.description,
            item.prix,
            item.quantite,
            item.date_expiration,
            item.date_alerte,
            item.fournisseur,
            item.created_at,
            item.slug,
            item.deleted,
            item.image,
            
          
          )
        );
      }),
      catchError(this.handleError)
    );
  }
  
  

//pour soustraire la quantité d'un produit dans la base de donné
SoustraireQuantitePorduit(idProduit:number, quantite:number): Observable<any> {
  let url=`${this.base_supermarket_url}supermarket/produits-fournisseur/${idProduit}/`;
  const body = { quantite: quantite }
  return this.http.patch<any>(
    url,
    body
  ).pipe(
  
    map(quantite => {
      console.log(quantite);  
      return quantite;
    }),
    catchError(handleError)
  );
}




}
