import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../classes/user';
import { Emitters } from '../emitters/emitters';
import { Administrateur } from '../interfaces/administrateur';
import { BASE_SUPERMARKET_URL, HTTP_OPTIONS } from '../urls';

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-type': 'application/json',
//   })
// };

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // user = new BehaviorSubject<User | null>(null);
  user: User | null = null;
  message: string = '';
  // authenticated = false;
  is_authenticated = {
    "value": false,
  };

  // base_url = 'http://localhost:8000/';
  // base_supermarket_url = this.base_url + 'api/v1/';
  base_supermarket_url = 'http://localhost:8000/api/v1/';

  constructor(private http: HttpClient, private router: Router) { }

  public getToken(): string {
    const userJson = localStorage.getItem('currentUser');
    const userData = userJson !== null ? JSON.parse(userJson) : User;
    return userData.token;
  }

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
        return throwError(() => new Error("Identifiant et/ou mot de passe incorrect"));
    }
    // Return an observable with a user-facing error message.
    // return throwError(() => new Error('Something bad happened; please try again later.'));
    // return throwError(() => new Error(error.statusText));
  }

  // login(username: string, password: string) {
  //   console.log("login");
  //   return this.http.post<any>(
  //     this.base_supermarket_url + 'accounts/api-token-auth/',
  //     { username, password }, HTTP_OPTIONS
  //   ).pipe(
  //     map(data => {
  //       console.log(data.user.id);
  //       if (data && data.token) {
  //         console.log(data.token);
  //         this.user = new User(
  //           data.user.id, data.user.username, data.user.last_name, data.user.first_name,
  //           data.user.email, data.user.adresse, data.user.num_telephone,
  //           // user.created_at, user.updated_at,
  //           data.user.deleted,
  //           // user.is_gestionnaire_stock, user.is_caissier, user.is_administrateur, user.is_directeur, user.is_fournisseur,
  //           data.token);

  //         // this.authenticated = true;
  //         // Emitters.authEmitter.emit(true); // On émet un signal pour dire que l'utilisateur est connecté
  //         localStorage.setItem("currentUser", JSON.stringify(this.user));
  //         this.is_authenticated.value = true;
  //         localStorage.setItem("is_authenticated", JSON.stringify(this.is_authenticated));

  //         localStorage.setItem("liste_permissions", JSON.stringify(data.liste_permissions));
  //         localStorage.setItem("has_permissions", JSON.stringify(data.has_permissions));
  //         // this.router.navigateByUrl("/dashboard");
  //       }
  //       console.log("USER ---------------- : ", this.user);
  //       console.log(data.liste_permissions);
  //       console.log(data.has_permissions);
  //       console.log("Heeeeeeeeeeeeeeeeeeeeeeeeeeeee", this.base_supermarket_url + 'accounts/api-token-auth/',
  //       { username, password }, HTTP_OPTIONS);
  //       return data;
  //     }),
  //     catchError(this.handleError)
  //   )
  // }







  // login(username: string, password: string) {
  //   return this.http.post<any>(this.base_supermarket_url + 'accounts/api-token-auth/', { username, password })
  //     .pipe(
  //       map(response => {
  //         // login successful if there's a jwt token in the response
  //         if (response && response.token) {
  //           // store user details and jwt token in local storage to keep user logged in between page refreshes
  //           localStorage.setItem('currentUser', JSON.stringify(response.user));
  //           localStorage.setItem('token', response.token);
            
  //         } else {
            
  //         }
  //       }),
      
  //         catchError(this.handleError)
        
  //     );
  // }





  login(username: string, password: string) {
    const body = { username, password };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    console.log(body);
    return this.http.post<any>(
      this.base_supermarket_url + 'accounts/api-token-auth/',
      body,
      httpOptions
    ).pipe(
      map(data => {
        console.log(data);
        if (data && data.token) {
          this.user = new User(
            data.user.id, data.user.username, data.user.last_name, data.user.first_name,
            data.user.email, data.user.adresse, data.user.num_telephone,
              data.user.deleted,
            data.token);
          localStorage.setItem("currentUser", JSON.stringify(this.user));
          this.is_authenticated.value = true;
          localStorage.setItem("is_authenticated", JSON.stringify(this.is_authenticated));
          localStorage.setItem("liste_permissions", JSON.stringify(data.liste_permissions));
          localStorage.setItem("has_permissions", JSON.stringify(data.has_permissions));
        }
        return data;
      }),
      catchError(this.handleError)
    );
  }










  autoLogin() {
    const userJson = localStorage.getItem('currentUser');
    const userData = userJson !== null ? JSON.parse(userJson) : User;
    const is_authenticated_Json = localStorage.getItem('is_authenticated');
    const is_authenticated_Data = is_authenticated_Json !== null ? JSON.parse(is_authenticated_Json) : Boolean;
    if (!(userData && is_authenticated_Data)) {
      Emitters.authEmitter.emit(false); // On émet un signal pour dire que l'utilisateur n'est pas connecté
      
      return;
    } else {
      this.user = new User(
        userData.id, userData.username, userData.last_name, userData.first_name,
        userData.email, userData.adresse, userData.num_telephone,
       
        userData.deleted,
       
        userData.token);

      this.is_authenticated.value = is_authenticated_Data.value;
      
      console.log(this.user);
      console.log(this.is_authenticated);
      
    }
    return;
  }

  logout() {
    // this.authenticated = false;
    return this.http.post<any>(
      this.base_supermarket_url + 'dj-rest-auth/logout/',
      HTTP_OPTIONS
    ).subscribe(message => {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('is_authenticated');
      this.router.navigateByUrl("/login");
      console.log(message);
    })
  }

  getAdministrateurs(): Observable<Administrateur[]> {
    return this.http.get<Administrateur[]>(this.base_supermarket_url + 'administrateurs/');
  }

  getCaissiers() {
    return this.http.get(this.base_supermarket_url + 'caissiers/');
  }
}
