import { DatePipe } from "@angular/common";



export interface Produit {
  id: number;
  code: string;
  nom: string;
  description: string;
  prix: number;
  quantite: number;
  image: string;
  date_expiration: Date;
  date_alerte: Date;
  deleted: boolean;
}
