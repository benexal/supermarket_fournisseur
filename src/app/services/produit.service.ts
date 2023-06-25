import { DatePipe } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { catchError, delay, Observable, of, switchMap, throwError,take, tap } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CategorieProduit } from '../interfaces/categorie';
import { Fournisseur } from '../interfaces/fournisseur';
import { Produit } from '../interfaces/produit';
import { TypeProduit } from '../interfaces/type';
import { BASE_SUPERMARKET_URL, HTTP_OPTIONS } from '../urls';
import { handleError } from '../utils';
import { GestionnaireService } from './gestionnaire.service';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  produits_supermarche_url = BASE_SUPERMARKET_URL + "supermarket/produits-fournisseur/";
  produits_supermarche_notification_url = BASE_SUPERMARKET_URL + "produits-supermarche-notification/";

  produits_supermarche_details_url = this.produits_supermarche_url + "?depth=1";

  produits_supermarche_notification_details_url = this.produits_supermarche_notification_url + "?depth=1";

  constructor(
    private http: HttpClient
  ) { }

  getProduits(): Observable<any> {
    return this.http.get<any>(this.produits_supermarche_details_url).pipe(
      map(produit => {
        console.log(produit)
        return produit;
      }),
      catchError(handleError)
    );
  }

  getProduitsNotifications(): Observable<any> {
    return this.http.get<any>(this.produits_supermarche_notification_details_url).pipe(
      map(produit => {
        console.log(produit)
        return produit;
      }),
      catchError(handleError)
    );
  }

  getProduitsAVendre(): Observable<any> {
    var url = BASE_SUPERMARKET_URL + "produits-supermarche-a-vendre/";
    return this.http.get<any>(url).pipe(
      map(produit => {
        console.log(produit)
        return produit;
      }),
      catchError(handleError)
    );
  }

  create(queryBody: FormData): Observable<any> {
    const url = `${this.produits_supermarche_url}`;
    var qBody = queryBody;
    console.log("create", url, {
      qBody
    });
    return this.http.post<any>(
      url,
      
      queryBody,
      // HTTP_OPTIONS
    ).pipe(
      map(new_produit => {
        return new_produit;
      }),
      catchError(handleError)
    );
  }

  create2(form: any): Observable<any> {
    const url = `${this.produits_supermarche_url}`;
    console.log("create", url, { form });
    return this.http.post<any>(
      url,
      { form },
      HTTP_OPTIONS
    ).pipe(
      map(new_produit => {
        return new_produit;
      }),
      catchError(handleError)
    );
  }

  getProduitDetails(id: number): Observable<any> {
    const url = `${this.produits_supermarche_url}${id}/?depth=1`;
    console.log("uuuuuuuuuuuuuuurrrrrrrrrllll", url);
    return this.http.get<Produit>(url).pipe(
      // delay(1000),
      map(produit_detail => {
        console.log(produit_detail);
        return produit_detail;
      }),
      catchError(handleError)
    );
  }

  update(
    queryBody: FormData
  ): Observable<any> {
    console.log(queryBody);
    var id_produit = queryBody.get("id");
    console.log("ID_PRODUIT = ", id_produit);
    const url = `${this.produits_supermarche_url}${id_produit}/`;
    // var qBody = queryBody.get("quantite");
    console.log("update", url, {
      queryBody
    },);

    return this.http.patch<any>(
      url,
      queryBody,
    ).pipe(
      map(updated_produit => {
        return updated_produit;
      }),
      catchError(handleError)
    );
  }

  update2(
    queryBody: FormData
  ): Observable<any> {
    console.log(queryBody);
    var id_produit = queryBody.get("id");
    console.log("ID_PRODUIT = ", id_produit);
    const url = `${this.produits_supermarche_url}${id_produit}/`;
    // var qBody = queryBody.get("quantite");
    console.log("update", url, {
      queryBody
    },);

    return this.http.put<any>(
      url,
      queryBody,
    ).pipe(
      map(updated_produit => {
        return updated_produit;
      }),
      catchError(handleError)
    );
  }

  loadData(url: string, pageIndex: number, pageSize: number) {
    this.http.get(`${url}?page=${pageIndex + 1}&page_size=${pageSize}`)
      .pipe(
        map(produit => {
          console.log(produit)
          return produit;
        }),
        catchError(handleError)
      );
  }

  



}
