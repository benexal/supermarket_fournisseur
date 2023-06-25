import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './layouts/header/header.component';
import { MessagesComponent } from './layouts/messages/messages.component';

import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { SwitcherComponent } from './layouts/switcher/switcher.component';
import { OverlayBackToTopButtomFooterComponent } from './layouts/overlay-back-to-top-buttom-footer/overlay-back-to-top-buttom-footer.component';
import { AuthenticationLoginComponent } from './pages/authentication-login/authentication-login.component';
import { AuthenticationRegisterComponent } from './pages/authentication-register/authentication-register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { Error404Component } from './pages/error404/error404.component';
import { NotificationComponent } from './pages/notification/notification.component';
import { UserProfilComponent } from './pages/user-profil/user-profil.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NavButtonComponent } from './layouts/nav-button/nav-button.component';


import { ProduitAddComponent } from './pages/stock/produit-add/produit-add.component';
import { ProduitDetailComponent } from './pages/stock/produit-detail/produit-detail.component';


import { DataTablesModule } from 'angular-datatables';
import { MatPaginatorModule } from '@angular/material/paginator';
import { httpInterceptorProviders } from './interceptors';
import { ProduitsComponent } from './pages/stock/produits/produits.component';
import { LivraisonComponent } from './pages/livraison/livraison/livraison.component';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MessagesComponent,
    SidebarComponent,
    SwitcherComponent,
    OverlayBackToTopButtomFooterComponent,
    AuthenticationLoginComponent,
    AuthenticationRegisterComponent,
    DashboardComponent,
    Error404Component,
    NotificationComponent,
    UserProfilComponent,
    NavButtonComponent,
   
    ProduitAddComponent,
    ProduitDetailComponent,
   
    ProduitsComponent,
        LivraisonComponent,
   
  
    
  
    
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      maxOpened: 1,
      progressBar: true,
      progressAnimation: 'decreasing',
      preventDuplicates: true,
    }),
    DataTablesModule
  ],
  providers: [
    // { provide: LOCALE_ID, useValue: 'fr-FR' },
    httpInterceptorProviders,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }