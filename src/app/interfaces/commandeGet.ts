import { DatePipe } from "@angular/common";
import { UserGet } from "./userGet";
import { LigneCommandeGet } from "./ligneCommandeGet";



export class CommandeGet{
   


    constructor(
     public id: number,
     public numero_tracking: string,
     public montant_ht: number,
     public created_by: UserGet,
     public fournisseur: UserGet,
     public lignes_commande: LigneCommandeGet[],
     public etat_commande:string,
     public created_at: string,
     public slug: string,
     public deleted: boolean, 
     ){ }
  }