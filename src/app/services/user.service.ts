import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { User } from '../classes/user';
import { BASE_SUPERMARKET_URL, HTTP_OPTIONS } from '../urls';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  base_supermarket_url = BASE_SUPERMARKET_URL;

  constructor(
    protected http: HttpClient
  ) { }

  public getToken(): string {
    const userJson = localStorage.getItem('currentUser');
    const userData = userJson !== null ? JSON.parse(userJson) : User;
    console.log(userData.token)
    return userData.token;
  }

  protected handleError(error: HttpErrorResponse) {
   
    if (error.status === 0) {
      
      console.error('An error occurred:', error.error);
      
      return of({ erreur : "Une erreur s'est produite. Veuillez réessayer plus tard."})
    } else {
      
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
        return of(error.error)
    }
  }

  getAllUsers(): Observable<any[] | string> {
    return this.http.get<any[] | string>('http://localhost:8000/api/v1/accounts/fournisseurs').pipe(
      map(users => {
        return users;
      }),
      catchError(this.handleError)
    );
  }

  getUserDetails(
    url: string,
    id: number
  ): Observable<any> {
    const url_ = `${this.base_supermarket_url}${url}${id}/`;
    console.log("uuuuuuuuuuuuuuurrrrrrrrrllll", url);
    return this.http.get<any>(url).pipe(
      map(user_detail => {
        return user_detail;
      }),
      catchError(this.handleError)
    );
  }

  

  
}
