//<reference path="../../../../assets/plugins/edittable/bstable.js" />

import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { Produit } from 'src/app/interfaces/produit';
import { ProduitService } from 'src/app/services/produit.service';
import { isObject } from 'src/app/utils';
import { ToastrService } from 'ngx-toastr';
import { PageEvent } from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {
  selectedProduit!: Produit;
  produits: Produit[] = [];
  errorMessage: string = '';
  produitSuccessMessage: string = '';
  dtOptions: any = {};
  produitForm!: any;
  ajouterQuantiteProduitForm!: FormGroup;
  retirerQuantiteProduitForm!: FormGroup;
  submitedAjouterQuantiteProduitForm = false;
  submitedRetirerQuantiteProduitForm = false;
  retirerQuantiteProduitFormData!: any;
  ajouterQuantiteProduitFormData!: any;
  errorAjouterQuantiteProduitForm!: {[key: string]: string} | null;
  errorRetirerQuantiteProduitForm!: {[key: string]: string} | null;

  pageIndex = 1;
  pageLength = 12;
  nombre_total_produits!: number;
  totalPages!: number;
  START: number = 1;
  END: number = this.pageLength;

 
  @ViewChild('tableProduit', { static: false }) table: any;


  constructor(
    private activatedRoute: ActivatedRoute,
    // private elementRef: ElementRef,
    private toastrService: ToastrService,
    private fb: FormBuilder,
    @Inject(ProduitService) private produitService: ProduitService,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.importFichiersJS();
    this.getAllProduits();
    this.setDatePicker();

    this.dtOptions = this.dataTableOption();

    this.produitForm = this.newProduitForm();

    this.retirerQuantiteProduitForm = this.updateQuantiteStockProduitForm();
    this.ajouterQuantiteProduitForm = this.updateQuantiteStockProduitForm();

    
  }

  loadData(pageIndex: number, pageSize: number) {
    this.http.get(`http://localhost:8000/api/v1/supermarket/produits-fournisseur/?depth=1&page=${pageIndex + 1}&page_size=${pageSize}`)
      .subscribe((data: any) => {
        this.produits = data['results'];
        this.nombre_total_produits = data['count'];
      });
  }

  _loadData(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageLength = event.pageSize;

    this.http.get(`http://localhost:8000/api/v1/supermarket/produits-fournisseur/?depth=1&page=${event.pageIndex + 1}&page_size=${event.pageSize}`)
      .subscribe((data: any) => {
        this.produits = data['results'];
        this.nombre_total_produits = data['count'];
      });
  }

  

  activation_et_desactivation_des_boutons_de_navigation () {

    $(".page-item").click(function(){
      $(".page-item").removeClass("active");

      console.log("TEST PARENT = ", $(this).parent("#page-item"));

      if (
        $(this).hasClass("first") ||
        $(this).hasClass("previous") ||
        $(this).hasClass("next") ||
        $(this).hasClass("last")) {

        console.log("Le bouton a soit la classe firts ou previous ou next ou last");

        
        $(".pageIndex").addClass("active");

        
      } else {
        console.log("Le bouton contient un numéro de page");
        
        $(".pageIndex").addClass("active");
      }

    
    });
  }

  navigate_produit(numeroOfPage: number): any {
    this.activation_et_desactivation_des_boutons_de_navigation();

    this.http.get(`http://localhost:8000/api/v1/supermarket/produits-fournisseur/?depth=1&page=${numeroOfPage}`)
      .subscribe((data: any) => {
        this.produits = data['results'];
        this.nombre_total_produits = data['count'];

        this.totalPages = Math.ceil(this.nombre_total_produits / this.pageLength);
        console.log("Nombre total de page", this.totalPages);

        console.log("navigate_produit est exécutée");
        console.log("La data = ", data);
        console.log("Liste des produits récupérés = ", this.produits);

        
        this.pageIndex = numeroOfPage;

        this.activation_first_et_previous();
        this.activation_next_et_last();
        if(this.pageIndex === 1) {
          this.desactivation_first_et_previous();
          this.activation_next_et_last();
        }
        if(this.pageIndex === this.totalPages) {
          this.desactivation_next_et_last();
          this.activation_first_et_previous();
        }

        this.START = 1 + (this.pageLength * (numeroOfPage - 1));
       
        this.END = this.START + this.produits.length - 1;

       

        this.dtOptions.language.info = `Affichage de ${this.START} à ${this.END} sur ${this.nombre_total_produits} entrées`;
        this.dtOptions = Object.assign({}, this.dtOptions); 

        console.log("dtOptions", this.dtOptions);
        var t: any = $('#tableProduit').DataTable();
       
      });
    
  }

  go_to_first_page() {
    this.navigate_produit(1);
    $(".pageIndex").addClass("active");
  }

  go_to_last_page() {
    this.navigate_produit(this.totalPages);
    $(".pageIndex").addClass("active");
  }

  desactivation_first_et_previous() {
    console.log("first avant désactivation", $(".first"));
    $(".first").addClass("disabled");
    $(".previous").addClass("disabled");
  }

  desactivation_next_et_last() {
    $(".last").addClass("disabled");
    $(".next").addClass("disabled");
  }

  activation_first_et_previous() {
    $(".first").removeClass("disabled");
    $(".previous").removeClass("disabled");
  }

  activation_next_et_last() {
    $(".last").removeClass("disabled");
    $(".next").removeClass("disabled");
  }

  importFichiersJS() {
   
  }

  getAllProduits() {
    

    this.activatedRoute.data.subscribe(
      ({ produits_or_error }) => {
        // ------------------En cas d'erreur, c'est une chaine de caractère qui est renvoyée------------------------------
        console.log(produits_or_error);

        if ((produits_or_error.erreur)) {
          console.log("Problème");
          this.errorMessage = produits_or_error.erreur;
        } else {
          this.produits = produits_or_error.results;
          this.nombre_total_produits = produits_or_error['count'];
          this.totalPages = Math.ceil(this.nombre_total_produits / this.pageLength);
        }
      }
    );
  }

  dataTableOption() {
   
    return {
      pagingType: 'full_numbers',
      pageLength: `${this.pageLength}`,
      lengthChange: true,
      lengthMenu: [5, 10, 25, 50, 100],
      processing: true,
      paging: false,
      dom: 'Bfrtip',
      buttons: [
        'copy', 'csv', 'excel', 'pdf', 'print', 'colvis'
      ],
      info: false,
      language: {
        
      }
    };
  }

  setDatePicker() {
    $(function () {
			($('#date_expiration') as any).bootstrapMaterialDatePicker({
				time: false,
			}) ;
			($('#date_alerte') as any).bootstrapMaterialDatePicker({
				time:false
			});
		});
  }

  newProduitForm() {
    return new FormGroup({
      code: new FormControl('', [Validators.required]),
      nom: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      prix_acquisition: new FormControl(''),
    })
  }

  onSelect(produit: Produit): void {
    this.selectedProduit = produit;
    
  }

  previewImageProduit (event: any) {
    console.log(event);
    var i!: any;
    i = document.getElementById('box_image_produit');
    i.src = window.URL.createObjectURL(event.target.files[0]);
  }

  updateQuantiteStockProduitForm() {
    return this.fb.group({
      idProduit: new FormControl('', [Validators.required]),
      quantite: new FormControl('1', [Validators.required]),
    });
  }

  get fRetirerQuantiteProduit() { return this.retirerQuantiteProduitForm.controls; }
  get idProduitRetirerQuantiteProduit() { return this.retirerQuantiteProduitForm.get("idProduit"); }
  get quantiteRetirerQuantiteProduit() { return this.retirerQuantiteProduitForm.get("quantite"); }

  get fAjouterQuantiteProduit() { return this.ajouterQuantiteProduitForm.controls; }
  get idProduitAjouterQuantiteProduit() { return this.ajouterQuantiteProduitForm.get("idProduit"); }
  get quantiteAjouterQuantiteProduit() { return this.ajouterQuantiteProduitForm.get("quantite"); }

  onRetirerQuantiteProduitFormSubmit(produit: any) {
    this.retirerQuantitesubmitData(produit);
    this.submitedRetirerQuantiteProduitForm = true;

    console.log("onProduitFormSubmit valid", this.retirerQuantiteProduitForm, "===");
    console.log("ID PRODUIT = ", this.idProduitRetirerQuantiteProduit);
    if(this.retirerQuantiteProduitForm.valid) {
     
      this.produitService.update(
        this.retirerQuantiteProduitFormData
      ).pipe(first()).subscribe(
        data => {
          if(!isObject(data)){
            data = JSON.parse(data);
          }
          console.log("data retourné par le backend au niveau de produit component = ", data);
          if(!data["erreur"]) {
            console.log("Produit update", data);
            this.onRetirerQuantiteProduitFormReset();
            this.errorRetirerQuantiteProduitForm = null;

            

            this.produits = this.produits.map(obj => {
              if (obj.id === data.id) {
                return data;
              }
              return obj;
            });
            this.toastrService.success("Quantité du produit : '" + data.nom + "' mise à jour avec succes !", "Mise à jour du produit", {
              closeButton: true,
            });
           
            console.log("LISTE PRODUITS APRES AVOIR DIMINUER LE STOCK", this.produits);
            ($('#reduireProduit' + produit.id + 'Modal') as any).modal('hide');
          } else {
            console.log("erreur", data);
            this.errorRetirerQuantiteProduitForm = data["erreur"];
            this.toastrService.error("Echec de la mise à jour de la quantité du produit" + data.nom + "mise à jour avec succes !", "Mise à jour du produit", {
              closeButton: true,
            });
          }

        }
      )
    } else {
      console.log("onRetirerQuantiteProduitForm non valide");
    }
  }

  onAjouterQuantiteProduitFormSubmit(produit: any) {
    this.ajouterQuantitesubmitData(produit);
    this.submitedAjouterQuantiteProduitForm = true;

    console.log("onProduitFormSubmit valid", this.ajouterQuantiteProduitForm, "===");
    console.log("ID PRODUIT = ", this.idProduitAjouterQuantiteProduit);
    if(this.ajouterQuantiteProduitForm.valid) {
      
      this.produitService.update(
        this.ajouterQuantiteProduitFormData
      ).pipe(first()).subscribe(
        data => {
          if(!isObject(data)){
            data = JSON.parse(data);
          }
          console.log("data retourné par le backend au niveau de produit component = ", data);
          if(!data["erreur"]) {
            console.log("Produit update", data);
            this.onAjouterQuantiteProduitFormReset();
            this.errorAjouterQuantiteProduitForm = null;

            this.produits = this.produits.map(obj => {
              if (obj.id === data.id) {
                return data;
              }
              return obj;
            });

          
            this.toastrService.success("Quantité du produit : '" + data.nom + "' mise à jour avec succes !", "Mise à jour du produit", {
              closeButton: true,
            });
            console.log("LISTE PRODUITS APRES AVOIR AUGMENTER LE STOCK", this.produits);
            ($('#addProduit' + produit.id + 'Modal') as any).modal('hide');
          } else {
            console.log("erreur", data);
            this.errorAjouterQuantiteProduitForm = data["erreur"];
            this.toastrService.error("Echec de la mise à jour de la quantité du produit" + data.nom + "mise à jour avec succes !", "Mise à jour du produit", {
              closeButton: true,
            });
          }

        }
      )
    } else {
      console.log("onRetirerQuantiteProduitForm non valide");
    }
  }

  retirerQuantitesubmitData(produit: any) {
    let formData = new FormData();

    var new_quantite = produit.quantite - this.quantiteRetirerQuantiteProduit?.value;
    this.retirerQuantiteProduitForm.patchValue({"quantite": new_quantite});

    formData.append("id", this.idProduitRetirerQuantiteProduit?.value);
    formData.append("quantite", this.quantiteRetirerQuantiteProduit?.value);

    this.retirerQuantiteProduitFormData = formData;
  }

  ajouterQuantitesubmitData(produit: any) {
    let formData = new FormData();

    var new_quantite = produit.quantite + parseInt(this.quantiteAjouterQuantiteProduit?.value, 10);
    this.ajouterQuantiteProduitForm.patchValue({"quantite": new_quantite});

    formData.append("id", this.idProduitAjouterQuantiteProduit?.value);
    formData.append("quantite", this.quantiteAjouterQuantiteProduit?.value);

    this.ajouterQuantiteProduitFormData = formData;
  }

  onRetirerQuantiteProduitFormReset() {
    this.submitedRetirerQuantiteProduitForm = false;
    this.retirerQuantiteProduitForm = this.updateQuantiteStockProduitForm();
  }

  onAjouterQuantiteProduitFormReset() {
    this.submitedRetirerQuantiteProduitForm = false;
    this.ajouterQuantiteProduitForm = this.updateQuantiteStockProduitForm();
  }

  changeRetirerQuantite(produit: any) {
    console.log("AVEC CHANGE RetirerQuantite = ", produit);

    this.retirerQuantiteProduitForm.patchValue({"idProduit": produit.id});
  }

  changeAjouterQuantite(produit: any) {
    console.log("AVEC CHANGE AjouterQuantite = ", produit);

    this.ajouterQuantiteProduitForm.patchValue({"idProduit": produit.id});
  }
}
