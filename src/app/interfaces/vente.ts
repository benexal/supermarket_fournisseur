import { DatePipe } from "@angular/common";
import { Client } from "./client";
import { LigneVente } from "./lignevente";
import { AllUser } from "./user";
import { Fournisseur } from "./fournisseur";

export interface Vente {
  id: number;
  numero_tracking: string;
  montant_ht: number;
  moyen_payement: string;
  created_by: Fournisseur;
  lignes_vente: LigneVente[];
  slug: string;
  created_at: DatePipe;
  updated_at: DatePipe;
  deleted: boolean;
}
