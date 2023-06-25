import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Gestionnaire } from '../interfaces/gestionnaire';

import { BASE_SUPERMARKET_URL, HTTP_OPTIONS } from '../urls';
// import { Commande } from '../interfaces/Commande';
import { AuthService } from './auth.service';
import { data } from 'jquery';

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-type': 'application/json',
//   })
// };

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  

 
  base_supermarket_url = BASE_SUPERMARKET_URL;

  constructor( private http: HttpClient,
                private autheticationService: AuthService) { }




   handleError(error: HttpErrorResponse) {
    
    if (error.status === 0) {
      
      console.error('An error occurred:', error.error);
      

      return of({ erreur : "Une erreur s'est produite. Veuillez réessayer plus tard."})
    } else {
      
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
        return of(error.error)
    }
  }



   getAllGestionnaires(): Observable<Gestionnaire[]> {
    return this.http.get<any>(this.base_supermarket_url + "gestionnaires").pipe(

        map((data: any) => {
            return data.results.map((item: any) => 
              new Gestionnaire(
                item.id,
                item.user_name,
                item.last_name,
                item.first_name,
                item.email,
                item.adresse,
                item.num_telephone,
                item.deleted          
              )
            );
          }),
          catchError(this.handleError)

    )
     
  }

  //recupere toutes les commandes
    // getAllCommande():Observable<Commande[]>{
    //     return this.http.get<any>(this.base_supermarket_url + "commandes").pipe(
    //         map((data: any) => {
    //           return data.results.map((item: any) => 
    //             new Commande(
    //               item.id,
    //               item.numero_tracking,
    //               item.montant_ht,
    //               item.created_by,
    //               item.ligneDeCommande,
    //               item.fournisseur,
    //               item.created_at,
    //               item.etat,
    //               item.slug,
    //               item.deleted,   
                
    //             )
    //           );
    //         }),
    //         catchError(this.handleError)
    //       );

    // }
    //recupere toutes les commandes du fournisseurs connecte
    // getAllCommandeByFournisseur():Observable<Commande[]>{
    //     return this.getAllCommande().pipe(
    //         map(commande => {
    //           return commande.filter((data: Commande) => 
    //                 data.fournisseur === this.autheticationService.user?.id);
    //         }),
    //         catchError(this.handleError)
    //       );
    // }

// renvoies les produits du fournisseur, selon leur etat
    // getAllCommandeByFournisseurByEtat(etat: string){
    //     return this.getAllCommandeByFournisseur().pipe(
    //         map((commande) =>{
    //             return commande.filter((data: Commande) => 
    //                 data.etat ===etat              
    //             )
    //         })
    //     )
    // }

    
    
  
}
