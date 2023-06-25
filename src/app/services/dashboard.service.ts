import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { BASE_SUPERMARKET_URL } from '../urls';
import { handleError } from '../utils';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  base_supermarket_url = BASE_SUPERMARKET_URL;
  end_of_url_dashboard_supermarket: string = "supermarket/dashboard/";
  end_of_url_dashboard_fournisseur: string = "fournisseur/dashboard/";

  constructor(private http: HttpClient) { }

  getInfosDashboardSupermarche(): Observable<any> {
    return this.http.get<any>(this.base_supermarket_url + this.end_of_url_dashboard_supermarket).pipe(
      map(categories_produit => {
        return categories_produit;
      }),
      catchError(handleError)
    );
  }

  getInfosDashboardFournisseur(): Observable<any> {
    return this.http.get<any>(this.base_supermarket_url + this.end_of_url_dashboard_fournisseur).pipe(
      map(categories_produit => {
        return categories_produit;
      }),
      catchError(handleError)
    );
  }
}
