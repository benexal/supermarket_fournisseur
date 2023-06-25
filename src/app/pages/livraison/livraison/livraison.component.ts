import { Component, OnInit } from '@angular/core';
//import { Commande } from 'src/app/interfaces/Commande';
import { CommandeGet } from 'src/app/interfaces/commandeGet';
import { CommandeService } from 'src/app/services/commande.service';
import { LivraisonService } from 'src/app/services/livraison.service';
import { LigneCommandeGet } from 'src/app/interfaces/ligneCommandeGet';
import { ToastrService } from 'ngx-toastr';
import { ProduitFournisseur } from 'src/app/interfaces/produitFournisseur';


@Component({
  selector: 'app-livraison',
  templateUrl: './livraison.component.html',
  styleUrls: ['./livraison.component.css']
})
export class LivraisonComponent  implements OnInit{
  errorMessage: string = '';
  dtOptions: any = {};
  etatCommande= "en attente";
  fournisseur!:any;
  commandes!: CommandeGet[];
  lignesCommande:LigneCommandeGet[]=[];
  etats= ["en attente","en cours", "suspendue" ];
  nouvelEtat!:string;
  
  
  
  allproduitsFounisseurs!: ProduitFournisseur[];
  etatIsNotEnCours!: boolean; 
  etatIsNotEnAttente!: boolean; 
  

  constructor(
    
    private livraisonService: LivraisonService,
    private toastr: ToastrService,
  ){}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      dom: 'Bfrtip',
      buttons: [
        'copy', 'csv', 'excel', 'pdf', 'print'
      ],
    };

    this.afficheCommandeByEtat(this.etatCommande );
    this.getAllProduitsAllFournisseur();
    
   
   
   
  }
    
  afficheCommandeByEtat(etatCommande:string ){
    // d'avoir la liste de commande selon l'etat
    this.livraisonService.getAllCommandesByEtat(etatCommande).subscribe(
      (commandes: CommandeGet[]) => {
        this.commandes = commandes;  
        console.log(this.commandes);
      },
      (error: any) => {console.log(error);}
    );



    if(etatCommande==='en cours'){
      this.etatIsNotEnCours=false;
    
    }
   
   else{ 
    this.etatIsNotEnCours=true;
   }
  }


//modifier l'etat d'une commande
changerEtat(idCommande:number, selectElement: EventTarget | null){

  let etat='en attente';
  let parametre="marquer-en-attente";
 

  if (selectElement) {
     etat = (selectElement as HTMLSelectElement).value;
    
  }

 
  if(etat==='en attente'){
    
    parametre="marquer-en-attente";
    
  }
  if(etat==='en cours'){

    parametre="marquer-en-cours";
    
  }
  if(etat==='suspendues'){
    
    parametre="marquer-suspendue";
  }
 
  

  this.livraisonService.changerEtat(parametre,idCommande).subscribe(
    response => {
      console.log(response);
    },
    error => {
      console.error(error);
    }
  );
  this.toastr.success("la commande est maitenant "+etat);

}


//recuperer tout les produit du fournisseu
getAllProduitsAllFournisseur(){
  this.livraisonService.getAllProduitsFournisseurs().subscribe(
    (produits: ProduitFournisseur[]) => {
      this.allproduitsFounisseurs = produits;
    },
    (error: any) => {console.log(error);}
  );
}


soustraireQuantiteByProduit(ligneCommandeDeMiseAJour: LigneCommandeGet[]){
  console.log(ligneCommandeDeMiseAJour);

 // this.getAllProduitsAllFournisseur();
  console.log(this.allproduitsFounisseurs+"hi");
  ligneCommandeDeMiseAJour.forEach((ligne:LigneCommandeGet) => {
    console.log(JSON.stringify(ligne)+"ligne");
    this.allproduitsFounisseurs.forEach((item: ProduitFournisseur) => {
      console.log(JSON.stringify(item)+"item");
      if(item.id == ligne.produit_fournisseur.id){
        console.log(ligne.quantite+"avant");
        ligne.quantite = item.quantite- ligne.quantite;
        console.log(ligne.quantite+"après");
      }
    }
    )
  }  
  )

  ligneCommandeDeMiseAJour.forEach(ligne =>
      this.livraisonService.SoustraireQuantitePorduit(ligne.produit_fournisseur.id,ligne.quantite).subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.error(error);
        }
      )
    )
}











etatAsLivraison(idCommande: number){
  this.livraisonService.changerEtat('livree',idCommande).subscribe(
    response => {
      console.log(response);
    },
    error => {
      console.error(error);
    }
  );
  this.toastr.success("la commande est maitenant livree");

}



  

}
