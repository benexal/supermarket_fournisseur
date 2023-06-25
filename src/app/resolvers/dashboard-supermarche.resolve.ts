import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from "@angular/router";
import { catchError, Observable } from "rxjs";
import { Vente } from "../interfaces/vente";
import { DashboardService } from "../services/dashboard.service";
import { handleError } from "../utils";


@Injectable({
  providedIn: 'root'
})
export class InfosDashboardResolve implements Resolve<any> {
  constructor(
    private dashboardService: DashboardService,
    private activatedRoute: ActivatedRoute,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    ): Observable<any> {
      console.log("URL dans le resolveur = ", route.url, route.url.length === 1);

      if (route.url.length === 1 && route.url[0].path === 'dashboard') {
        return this.dashboardService.getInfosDashboardSupermarche().pipe(
          catchError(handleError)
        );
      } else {
        return this.dashboardService.getInfosDashboardFournisseur().pipe(
          catchError(handleError)
        );
      }
  }
}
