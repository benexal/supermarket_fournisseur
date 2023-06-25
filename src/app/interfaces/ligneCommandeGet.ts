import { ProduitfournisseurGet } from "./produitFournisseurGet";

export class LigneCommandeGet{
   


    constructor(
    public id: number, 
     public produit_fournisseur: ProduitfournisseurGet,
     public quantite: number,
    
    
     
     ){ }
  }