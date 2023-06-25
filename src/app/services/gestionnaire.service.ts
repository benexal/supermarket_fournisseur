import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { catchError, delay, map, Observable, throwError } from 'rxjs';
import { User } from '../classes/user';
import { Gestionnaire } from '../interfaces/gestionnaire';
import { BASE_SUPERMARKET_URL } from '../urls';
import { AuthService } from './auth.service';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class GestionnaireService implements OnInit {
  // base_url = 'http://localhost:8000/';
  base_supermarket_url = BASE_SUPERMARKET_URL;

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private http: HttpClient
  ) { }

  public getToken(): string {
    const userJson = localStorage.getItem('currentUser');
    const userData = userJson !== null ? JSON.parse(userJson) : User;
    console.log(userData.token)
    return userData.token;
  }

  // getAdministrateurs(){
  //   return this.authService.getAdministrateurs();
  // }

  private handleError(error: HttpErrorResponse) {
    // this.authenticated = true;
    // Emitters.authEmitter.emit(true);  // On émet un signal pour dire que l'utilisateur n'est pas connecté
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
      return throwError(() => new Error("Une erreur s'est produite. Veuillez réessayer plus tard."));
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
      return throwError(() => new Error("Une erreur s'est produite. Veuillez réessayer plus tard."));
    }
    // Return an observable with a user-facing error message.
    // return throwError(() => new Error('Something bad happened; please try again later.'));
    // return throwError(() => {
    //   return error.error
    // });
  }

  getGestionnaires(): Observable<Gestionnaire[] | string> {
    return this.http.get<Gestionnaire[] | string>(this.base_supermarket_url + 'gestionnaires/').pipe(
      map(gestionnaires => {
        return gestionnaires;
      }),
      catchError(this.handleError)
    );
  }

  getGestionnaireDetails(id: number): Observable<Gestionnaire> {
    const url = `${this.base_supermarket_url}gestionnaires/${id}/`;
    console.log("uuuuuuuuuuuuuuurrrrrrrrrllll", url);
    return this.http.get<Gestionnaire>(url).pipe(
      delay(1000),
      map(gestionnaire_detail => {
        return gestionnaire_detail;
      }),
      catchError(this.handleError)
    );
  }


  ngOnInit(): void {
    // this.authService.getAdministrateurs();
  }

}
