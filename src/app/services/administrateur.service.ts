import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { catchError, delay, map, Observable, of, tap, throwError } from 'rxjs';
import { User } from '../classes/user';
import { Administrateur } from '../interfaces/administrateur';
import { BASE_SUPERMARKET_URL, HTTP_OPTIONS } from '../urls';
import { AuthService } from './auth.service';
// import { Administrateur } from '../interfaces/administrateur';
// import { ADMINISTRATEURS } from '../mock-administrateurs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class AdministrateurService implements OnInit {
  // base_url = 'http://localhost:8000/';
  // base_supermarket_url = this.base_url + 'api/v1/';
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
      // return throwError(() => new Error("Une erreur s'est produite. Veuillez réessayer plus tard."));

      return of({ erreur : "Une erreur s'est produite. Veuillez réessayer plus tard."})
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
        return of(error.error)
      // return throwError(() => new Error("Une erreur s'est produite. Veuillez réessayer plus tard."));
    }
    // Return an observable with a user-facing error message.
    // return throwError(() => new Error('Something bad happened; please try again later.'));
    // return throwError(() => {
    //   return error.error
    // });
  }

  getAdministrateurs(): Observable<Administrateur[] | string> {
    return this.http.get<Administrateur[] | string>(this.base_supermarket_url + 'administrateurs/').pipe(
      map(administrateurs => {
        return administrateurs;
      }),
      catchError(this.handleError)
    );
  }

  getAdministrateurDetails(id: number): Observable<Administrateur | string> {
    const url = `${this.base_supermarket_url}administrateurs/${id}/`;
    console.log("uuuuuuuuuuuuuuurrrrrrrrrllll", url);
    return this.http.get<Administrateur | string>(url).pipe(
      // delay(1000),
      map(administrateur_detail => {
        return administrateur_detail;
      }),
      catchError(this.handleError)
    );
  }

  create(
    username: string = "",
    first_name: string = "",
    last_name: string = "",
    email: string = "",
    adresse: string = "",
    num_telephone: string = "",
    new_password: string = ""
  ): Observable<any> {
    const url = `${this.base_supermarket_url}administrateurs/`;
    console.log("create", url, {
      username,
      first_name,
      last_name,
      email,
      adresse,
      num_telephone,
      new_password
    });
    return this.http.post<any>(
      url,
      {
        username,
        first_name,
        last_name,
        email,
        adresse,
        num_telephone,
        new_password
      },
      HTTP_OPTIONS
    ).pipe(
      map(new_administrateur => {
        return new_administrateur;
      }),
      catchError(this.handleError)
    );
  }


  ngOnInit(): void {
    // this.authService.getAdministrateurs();
  }

  // getAdministrateurs(): Observable<Administrateur[]> {
  //   const administrateurs = of(ADMINISTRATEURS);
  //   this.messageService.add('HeroService: fetched heroes');
  //   return administrateurs;
  // }
}
