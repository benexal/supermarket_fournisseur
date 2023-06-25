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
export class ProduitsResolve implements Resolve<Produit[] | string> {
  constructor(private produitService: ProduitService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<any> {
      if (route.url.length === 1 && route.url[0].path === 'produits') {
        return this.produitService.getProduits().pipe(
          catchError(handleError)
        );
      } else if (route.url.length === 1 && route.url[0].path === 'notification'){
        return this.produitService.getProduitsNotifications().pipe(
          catchError(handleError)
        );
      } else {
        return of({ erreur : "Une erreur s'est produite. Veuillez réessayer plus tard."});
      }

      // return this.produitService.getProduits().pipe(
      //   catchError(handleError)
      // );
  }

  // private handleError(error: HttpErrorResponse) {
  //   // this.authenticated = true;
  //   // Emitters.authEmitter.emit(true);  // On émet un signal pour dire que l'utilisateur n'est pas connecté
  //   if (error.status === 0) {
  //     // A client-side or network error occurred. Handle it accordingly.
  //     console.error('An error occurred:', error.error);
  //     return of("Une erreur s'est produite. Veuillez réessayer plus tard.")

  //   } else {
  //     // The backend returned an unsuccessful response code.
  //     // The response body may contain clues as to what went wrong.
  //     console.error(
  //       `Backend returned code ${error.status}, body was: `, error.error);
  //       return of("Une erreur s'est produite. Veuillez réessayer plus tard.")
  //   }
  // }
}
