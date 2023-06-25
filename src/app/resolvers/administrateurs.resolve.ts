import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { catchError, empty, Observable, of, throwError } from "rxjs";
import { Administrateur } from "../interfaces/administrateur";
import { AdministrateurService } from "../services/administrateur.service";


@Injectable({
  providedIn: 'root'
})
export class AdministrateursResolve implements Resolve<Administrateur[] | string> {
  constructor(private administrateurService: AdministrateurService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<Administrateur[] | string> {
      return this.administrateurService.getAdministrateurs().pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    // this.authenticated = true;
    // Emitters.authEmitter.emit(true);  // On émet un signal pour dire que l'utilisateur n'est pas connecté
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
      // return of(`An error occurred: ${error.status}`)
      return of("Une erreur s'est produite. Veuillez réessayer plus tard.")
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
        return of("Une erreur s'est produite. Veuillez réessayer plus tard.")
    }
  }
}
