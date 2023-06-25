



export class ProduitFournisseur {
   


    constructor(public id: number,
     public code: string,
     public  nom: string,
     public description: string,
     public prix: number,
     public quantite: number,
     public date_expiration: string,
     public date_alerte: string,
     public fournisseur: number,
     public created_at: string,
     public slug: string,
     public deleted: boolean,
     public image?: string, 
     public quantite_achete?:number,
     public isChecked?: boolean){ }
  }