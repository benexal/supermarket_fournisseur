import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationLoginComponent } from './pages/authentication-login/authentication-login.component';
import { AuthenticationRegisterComponent } from './pages/authentication-register/authentication-register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { Error404Component } from './pages/error404/error404.component';
import { ProduitsComponent } from './pages/stock/produits/produits.component';
import { UserProfilComponent } from './pages/user-profil/user-profil.component';
import { InfosDashboardResolve } from './resolvers/dashboard-supermarche.resolve';
import { ProduitDetailComponent } from './pages/stock/produit-detail/produit-detail.component';
import { FournisseursResolve } from './resolvers/fournisseurs.resolve';
import { ProduitAddComponent } from './pages/stock/produit-add/produit-add.component';
import { ProduitsResolve } from './resolvers/produits.resolve';

import { ProduitsAvendreResolve } from './resolvers/produits_a_vendre.resolve';
import { LivraisonComponent } from './pages/livraison/livraison/livraison.component';



const routes: Routes = [

  {
    path: 'dashboard',
    component: DashboardComponent,
    resolve: {
      infos_or_error: InfosDashboardResolve,
    }
  },

  { path: 'login', component: AuthenticationLoginComponent },
  {path: 'profil', component: UserProfilComponent},
  {path: 'dashboard', component: DashboardComponent},
  { path: 'error404', component: Error404Component },
  {path: 'produit', component: ProduitsComponent},
  {path: 'livraison', component: LivraisonComponent},
  
  {
    path: 'produits',
    component: ProduitsComponent,
    resolve: {
      produits_or_error: ProduitsResolve,
    }
  },
  {
    path: 'produit-add',
    component: ProduitAddComponent,
    resolve: {
      fournisseurs_produit_or_error: FournisseursResolve,
    }
  },
  {
    path: 'produits/:id/details',
    component: ProduitDetailComponent,
    resolve: {
      fournisseurs_produit_or_error: FournisseursResolve,
    }
  },
 
  { path: '',   redirectTo: 'login', pathMatch: 'full' },
  { path: '**', component: Error404Component },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
