import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
// import { CategoriesProduitService } from 'src/app/services/categories-produit.service';
// import { FournisseurService } from 'src/app/services/fournisseur.service';
import { ProduitService } from 'src/app/services/produit.service';

import { BASE_SUPERMARKET_URL } from 'src/app/urls';
import { isObject } from 'src/app/utils';

@Component({
  selector: 'app-produit-add',
  templateUrl: './produit-add.component.html',
  styleUrls: ['./produit-add.component.css']
})
export class ProduitAddComponent implements OnInit {

  base_supermarket_url: string = BASE_SUPERMARKET_URL;
  errorMessage: string = '';
  produit!: any;
  all_types!: any;
  produitForm!: any;
  produitFormData!: any;
  errorProduitForm!: {[key: string]: string} | null;
  submitted = false;
  image_produit!: File | any;
  

  

  constructor(
    private activatedRoute: ActivatedRoute,
    private produitService: ProduitService,
    private location: Location,
  
    private toastrService: ToastrService,
    // private categoriesProduitService: CategoriesProduitService,
    // private fournisseursProduitService: FournisseurService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    // this.getProduit();
    this.produitForm = this.newProduitForm();
    
    
    console.log("fournisseur");
   

    this.setDatePicker();
    this.setFormSelect2();
  }

  getProduit(): void {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.produitService.getProduitDetails(id).pipe(first()).subscribe(
      data => {
        if(!isObject(data)){
          data = JSON.parse(data);
        }
        console.log("LE PRODUIT EN QUESTION = ", data);
        this.produit = data;
        this.produitForm = this.newProduitForm();
      }, (errorRes) => {
        console.log("\n\noooooooooooo", errorRes.detail);
        this.errorMessage = errorRes.detail;
      }
    )
  }

  

 


  setDatePicker() {
    $(function () {
			($('#date_expiration') as any).bootstrapMaterialDatePicker({
				time: false,
			}) ;
			($('#date_alerte') as any).bootstrapMaterialDatePicker({
				time:false
			});
      console.log("Pickkkkkkk", $('#date_alerte').html);
		});
  }

  setFormSelect2() {
    $(function () {
			($('.single-select') as any).select2({
        theme: 'bootstrap4',
        width: $(this).data('width') ? $(this).data('width') : $(this).hasClass('w-100') ? '100%' : 'style',
        placeholder: $(this).data('placeholder'),
        allowClear: Boolean($(this).data('allow-clear')),
      });
      console.log("Woooooooooooooooooo", $('.single-select').html);
      ($('.multiple-select') as any).select2({
        theme: 'bootstrap4',
        width: $(this).data('width') ? $(this).data('width') : $(this).hasClass('w-100') ? '100%' : 'style',
        placeholder: $(this).data('placeholder'),
        allowClear: Boolean($(this).data('allow-clear')),
      });
		});
  }

  goBack(): void {
    this.location.back();
  }

  previewImageProduit (event: any) {
    console.log(event.target.files[0].webkitRelativePath);
    var i!: any;
    i = document.getElementById('box_image_produit');
    i.src = window.URL.createObjectURL(event.target.files[0]);

    this.image_produit = event.target.files[0];
  }

  preview(files: any) {
    if (files.length === 0)
      return;

    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      // this.imgURL = reader.result;
    }
  }

  get f() { return this.produitForm.controls; }
  get code() { return this.produitForm.get("code"); }
  get nom() { return this.produitForm.get("nom"); }
  get description() { return this.produitForm.get("description"); }
  get prix_acquisition() { return this.produitForm.get("prix"); }
  
  get quantite() { return this.produitForm.get("quantite"); }
  get quantite_critique() { return this.produitForm.get("quantite_critique"); }
  get image() { return this.produitForm.get("image"); }
  get date_expiration() { return this.produitForm.get("date_expiration"); }
 


  newProduitForm() {
    return new FormGroup({
      code: new FormControl("", [Validators.required]),
      nom: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
      prix: new FormControl("", [Validators.required]), 
      quantite: new FormControl("", [Validators.required]),
      image: new FormControl(),
      date_expiration: new FormControl("", []),
      date_alerte: new FormControl("", []),
      
    
    
    });
  }

  submitData() {
    let formData = new FormData();
    formData.append("code", this.f.code.value || "")
    formData.append("nom", this.f.nom.value || "");
    formData.append("description", this.f.description.value || "");
    formData.append("prix", this.f.prix.value || 0);
  
    formData.append("quantite", this.f.quantite.value || 0);
    
    formData.append("image", this.image_produit, this.f.image.value);
    formData.append("date_expiration", this.f.date_expiration.value || "");
    formData.append("date_alerte", this.f.date_alerte.value || "");
  
   
    
    

    console.log("my", formData);
    if(formData) {
      console.log("my_formdata", formData.forEach((val, key, formData) => {
        console.log("lllllll", val, key, formData);
      }));
      console.log("im", formData.get("image"));
    }

    this.produitFormData = formData;
  }

 

  onProduitFormSubmit() {
    console.log("onProduitFormSubmit");
    
    console.log(this.produitForm);
   
    // console.log("catégorie = ", parseInt(this.categorie.value, 10));
    // console.log("type = ", parseInt(this.type.value, 10));
    
    this.submitData();
    console.log("Valid=", this.produitForm.valid, "Ensuite", this.produitForm);
    this.submitted = true;
    if (this.produitForm.valid) {
      console.log("onProduitFormSubmit valid");
      this.produitService.create(
        this.produitFormData

      ).pipe(first()).subscribe(
        data => {
          if(data.id) {
            console.log("Objet créée", data);
            // this.onProduitFormReset();
            this.toastrService.success("Produit ajouté avec succès", "Ajout d'un produit");
            this.errorProduitForm = null;
            this.router.navigate(['/produits'])
          } else {
            console.log("erreur", data);
            this.errorProduitForm = data;
            this.toastrService.error("Ajout du produit échoué", "Ajout d'un produit");
          }

        }
      )
    }
  }

  transform(value: unknown, index: number, array: unknown[]) {
    // Vérifiez que value est bien une chaîne avant de la convertir en entier
    console.log("val = ", (value as string).substring(2), "index = ", index, "array = ", array)
    if (typeof value === 'string') {
      const spaceIndex = value.indexOf(' ');  // Récupération de l'index de l'espace blanc
      // const firstWord = value.substring(0, spaceIndex);  // Les caractères avant l'espace blanc. NB: il y a l'index suivi de deux points
                                                            // et un espace blanc avant la valeur exemple : "1: 3"
      const value_to_return = value.substring(spaceIndex + 1);  // Les caractères après l'espace blanc
      return parseInt(value_to_return, 10);
    }
    return value;
  }

  onChange(event: any) {
    // this.fournisseurs.setValue(Object.values(this.fournisseurs.value).map(this.transform));
    
    console.log(event.target.selectedOptions);
  }

  onProduitFormReset() {
    this.submitted = false;
    this.produitForm.reset();
  }


  ngAfterViewInit() {
    // Initialisez Select2 sur l'élément DOM de l'input select
    // $(this.fournisseurs_ids.nativeElement).select2();
  }

 

}