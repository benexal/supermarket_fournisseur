import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { catchError, empty, Observable, of, throwError } from "rxjs";
import { Fournisseur } from "../interfaces/fournisseur";
import { FournisseurService } from "../services/fournisseur.service";
import { handleError } from "../utils";


@Injectable({
  providedIn: 'root'
})
export class FournisseursResolve implements Resolve<Fournisseur[] | string> {
  constructor(private fournisseurService: FournisseurService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<any> {
      return this.fournisseurService.getAllUsers().pipe(
        catchError(handleError)
      );
  }
}
