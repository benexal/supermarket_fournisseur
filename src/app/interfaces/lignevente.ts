export interface LigneVente {
  id: number;
  vente: number;
  produit: number;
  produit_name: string;
  prix_unitaire: number;
  total: number;
  quantite: number;
  deleted: boolean;
}
