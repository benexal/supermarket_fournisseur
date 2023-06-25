import { DatePipe } from "@angular/common";
import { Gestionnaire } from "./gestionnaire";

export interface CategorieProduit {
  id: number;
  libelle: string;
  description: string;
  // gestionnaire_stock: Gestionnaire;
  // created_at: DatePipe;
  // updated_at: DatePipe;
  deleted: boolean;
}
