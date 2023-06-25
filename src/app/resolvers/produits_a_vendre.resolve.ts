import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { catchError, empty, Observable, of, throwError } from "rxjs";
import { Produit } from "../interfaces/produit";
import { ProduitService } from "../services/produit.service";
import { handleError } from "../utils";


@Injectable({
  providedIn: 'root'
})
export class ProduitsAvendreResolve implements Resolve<Produit[] | string> {
  constructor(private produitService: ProduitService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<any> {
      return this.produitService.getProduitsAVendre().pipe(
        catchError(handleError)
      );
  }
}
