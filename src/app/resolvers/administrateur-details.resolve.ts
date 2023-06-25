import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Administrateur } from "../interfaces/administrateur";
import { AdministrateurService } from "../services/administrateur.service";


@Injectable({
  providedIn: 'root'
})
export class AdministrateurDetailsResolve implements Resolve<Administrateur | string> {
  constructor(private administrateurService: AdministrateurService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<Administrateur | string> {
      console.warn(Number(route.paramMap.get('id')));
      return this.administrateurService.getAdministrateurDetails(Number(route.paramMap.get('id')));
  }
}
