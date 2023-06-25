import { DatePipe } from "@angular/common";

export interface AllUser {
  id: number;
  last_name: string;
  first_name: string;
  username: string;
  email: string;
  adresse: string;
  num_telephone: string;
  deleted: boolean;
  is_gestionnaire_stock: boolean;
  is_caissier: boolean;
  is_administrateur: boolean;
  is_directeur: boolean;
  is_fournisseur: boolean;
}
