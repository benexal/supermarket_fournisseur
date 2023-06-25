import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { delay, first } from 'rxjs';
// import { CategoriesProduitService } from 'src/app/services/categories-produit.service';
// import { FournisseurService } from 'src/app/services/fournisseur.service';
import { ProduitService } from 'src/app/services/produit.service';

import { BASE_SUPERMARKET_URL } from 'src/app/urls';
import { isObject } from 'src/app/utils';

@Component({
  selector: 'app-produit-detail',
  templateUrl: './produit-detail.component.html',
  styleUrls: ['./produit-detail.component.css']
})
export class ProduitDetailComponent implements OnInit {
  base_supermarket_url: string = BASE_SUPERMARKET_URL;
  errorMessage: string = '';
  produit!: any;
  id_produit = Number(this.activatedRoute.snapshot.paramMap.get('id'));
  all_types!: any;
  all_categories!: any;
  all_fournisseurs!: any;
  produitForm!: any;
  produitFormData!: any;
  errorProduitForm!: {[key: string]: string} | null;
  submitted = false;
  image_produit!: File | any;

  @ViewChild('fournisseurs_ids', { static: false }) fournisseurs_ids!: ElementRef;
  @ViewChild('type_id', { static: false }) type_id!: ElementRef;
  @ViewChild('categorie_id', { static: false }) categorie_id!: ElementRef;

  // produitForm = new FormGroup({
  //   code: new FormControl('', [Validators.required]),
  //   nom: new FormControl('', [Validators.required]),
  //   description: new FormControl('', [Validators.required]),
  //   prix_acquisition: new FormControl(0, [Validators.email]),
  //   prix_vente: new FormControl(0, [Validators.required]),
  //   quantite: new FormControl(0, [Validators.required]),
  //   quantite_critique: new FormControl(0, []),
  //   image: new FormControl(),
  //   date_expiration: new FormControl(),
  //   date_alerte: new FormControl(),
  //   categorie: new FormControl(),
  //   type: new FormControl(),
  //   fournisseurs: new FormControl(),
  //   en_vente: new FormControl(),
  // });

  constructor(
    private activatedRoute: ActivatedRoute,
    private produitService: ProduitService,
    private location: Location,
    
    private toastrService: ToastrService,
    private router: Router,
    // private categoriesProduitService: CategoriesProduitService,
    // private fournisseursProduitService: FournisseurService
    ) { }

  ngOnInit(): void {
    this.getProduit();
    // this.produitForm = this.updateProduitForm();

    // this.setDatePicker();
    this.getTypesProduit();
    this.getCategoriesProduit();
    console.log("fournisseur");
    this.getFournisseursProduit();

    this.setDatePicker();
    // this.setFormSelect2();
  }

  getProduit(): void {
    this.produitService.getProduitDetails(this.id_produit).pipe(first()).subscribe(
      data => {
        if(!isObject(data)){
          data = JSON.parse(data);
        }
        console.log("LE PRODUIT EN QUESTION = ", data);
        this.produit = data;
        this.produitForm = this.updateProduitForm();
        console.log("Juste après le getProduit, fournisseurs =", this.fournisseurs);
        console.log("Juste après le getProduit, categorie =", this.categorie);
        console.log("Juste après le getProduit, type =", this.type);
        this.setFormSelect2();
      }, (errorRes) => {
        console.log("\n\noooooooooooo", errorRes.detail);
        this.errorMessage = errorRes.detail;
      }
    )
  }

 

  getTypesProduit() {
    this.activatedRoute.data.subscribe(
      ({ types_produit_or_error }) => {
        // ------------------En cas d'erreur, c'est une chaine de caractère qui est renvoyée------------------------------
        if(!isObject(types_produit_or_error)){
          types_produit_or_error = JSON.parse(types_produit_or_error);
        }
        console.log(types_produit_or_error);

        if ((types_produit_or_error.erreur)) {
          console.log("Problème");
          this.errorMessage = types_produit_or_error.erreur;
        } else {
          this.all_types = types_produit_or_error.results;
          console.log("All Types");
          console.log(this.all_categories);
        }
      }
    );
  }

  getCategoriesProduit() {
    this.activatedRoute.data.subscribe(
      ({ categories_produit_or_error }) => {
        // ------------------En cas d'erreur, c'est une chaine de caractère qui est renvoyée------------------------------
        if(!isObject(categories_produit_or_error)){
          categories_produit_or_error = JSON.parse(categories_produit_or_error);
        }
        console.log(categories_produit_or_error);

        if ((categories_produit_or_error.erreur)) {
          console.log("Problème");
          this.errorMessage = categories_produit_or_error.erreur;
        } else {
          this.all_categories = categories_produit_or_error.results;
          console.log("All catégorie");
          console.log(this.all_categories);
        }
      }
    );
  }

  getFournisseursProduit() {
    this.activatedRoute.data.subscribe(
      ({ fournisseurs_produit_or_error }) => {
        if(!isObject(fournisseurs_produit_or_error)){
          fournisseurs_produit_or_error = JSON.parse(fournisseurs_produit_or_error);
        }
        // ------------------En cas d'erreur, c'est une chaine de caractère qui est renvoyée------------------------------
        console.log(fournisseurs_produit_or_error);

        if ((fournisseurs_produit_or_error.erreur)) {
          console.log("Problème");
          this.errorMessage = fournisseurs_produit_or_error.erreur;
        } else {
          this.all_fournisseurs = fournisseurs_produit_or_error.results;
          console.log("All fournisseurs");
          console.log(this.all_fournisseurs);
        }
      }
    );
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

  setFormSelect2_old() {
    $(function () {
			($('.single-select') as any).select2({
        theme: 'bootstrap4',
        width: $(this).data('width') ? $(this).data('width') : $(this).hasClass('w-100') ? '100%' : 'style',
        placeholder: $(this).data('placeholder'),
        allowClear: Boolean($(this).data('allow-clear')),
      });
      console.log("Woooooooooooooooooo", $('.single-select').html);
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
    // i.style = 'max-width: 256px; max-height: 256px;';


    // document.getElementById('box_image_produit').src = window.URL.createObjectURL(event.files[0]);
    // console.log(event.target.files[0]);
    // ($('#box_image_produit') as any).src = window.URL.createObjectURL(event.target.files[0]);
    // ($('#box_image_produit') as any).style = 'max-width: 256px; max-height: 134px;'
    // console.log(event.target.files[0].name);

    // console.log(($('#box_image_produit') as any).style);
      // const [picture] = event.target.files[0]

      // // "picture" est un objet File
      // if (picture) {
      //     // On change l'URL de l'image
      //     ($('#box_image_produit') as any).src = URL.createObjectURL(picture)
      // }

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
  get prix_unitaire() { return this.produitForm.get("prix_unitaire"); }
  get quantite() { return this.produitForm.get("quantite"); }
  get quantite_critique() { return this.produitForm.get("quantite_critique"); }
  get image() { return this.produitForm.get("image"); }
  get date_expiration() { return this.produitForm.get("date_expiration"); }
  get date_alerte() { return this.produitForm.get("date_alerte"); }
  get categorie() { return this.produitForm.get("categorie"); }
  get type() { return this.produitForm.get("type"); }
  get fournisseurs() { return this.produitForm.get("fournisseurs"); }
  get en_vente() { return this.produitForm.get("en_vente"); }

  updateProduitForm() {
    const idFournisseurs = [...this.produit.fournisseurs.map((obj: any) => obj.id)];
    return new FormGroup({
      code: new FormControl(this.produit.code, [Validators.required]),
      nom: new FormControl(this.produit.nom, [Validators.required]),
      description: new FormControl(this.produit.description, [Validators.required]),
      prix_acquisition: new FormControl(this.produit.prix_acquisition, [Validators.required]),
      prix_unitaire: new FormControl(this.produit.prix_unitaire, [Validators.required]),
      quantite: new FormControl(this.produit.quantite, [Validators.required]),
      quantite_critique: new FormControl(this.produit.quantite_critique, []),
      image: new FormControl(),
      date_expiration: new FormControl(this.produit.date_expiration, []),
      date_alerte: new FormControl(this.produit.date_alerte, []),
      categorie: new FormControl(this.produit.categorie.id),
      type: new FormControl(this.produit.type.id),
      fournisseurs: new FormControl(idFournisseurs),
      en_vente: new FormControl(this.produit.en_vente, []),
    });
  }

  submitData() {
    let formData = new FormData();
    formData.append("id", `${this.id_produit}`)
    formData.append("code", this.f.code.value || "")
    formData.append("nom", this.f.nom.value || "")
    formData.append("description", this.f.description.value || "")
    formData.append("prix_acquisition", this.f.prix_acquisition.value || 0)
    formData.append("prix_unitaire", this.f.prix_unitaire.value || 0)
    formData.append("quantite", this.f.quantite.value || 0)
    formData.append("quantite_critique", this.f.quantite_critique.value || 0)
    formData.append("date_expiration", this.f.date_expiration.value || "")
    formData.append("date_alerte", this.f.date_alerte.value || "")
    formData.append("categorie", this.f.categorie.value || "")
    // formData.append("categorie", "1")
    formData.append("type", this.f.type.value || "")
    // formData.append("type", "1")
    formData.append("fournisseurs", JSON.stringify(this.fournisseurs.value))
    formData.append("en_vente", this.f.en_vente.value || false)

    try {
      // code qui peut générer une exception
      formData.append("image", this.image_produit, this.f.image.value)
    } catch (error) {
      // code exécuté en cas d'exception
      console.log("Pas d'image sélectionnée pour la mise à jour");
    }

    console.log("my", formData);
    if(formData) {
      console.log("my_formdata", formData.forEach((val, key, formData) => {
        console.log("lllllll", val, key, formData);
      }));
      console.log("im", formData.get("image"), "code = ");
    }

    this.produitFormData = formData;

    console.log("formData", formData);
    console.log("produitFormData", this.produitFormData);

    // this.produitService.create2(formData).pipe(first()).subscribe(
    //   data => {
    //     if(data.id) {
    //       console.log("Objet créée", data);
    //       this.onProduitFormReset();
    //       this.errorProduitForm = null;
    //     } else {
    //       console.log("erreur", data);
    //       this.errorProduitForm = data;
    //     }
    //   }
    // )
  }

  selectedFournisseurs(id_fournisseur: number, produit_fournisseurs: any): Boolean {
    var fournisseur_object = produit_fournisseurs.find((obj: any) => obj.id === id_fournisseur);
    if(fournisseur_object){
      return true;
    } else {
      return false;
    }
  }

  onProduitUpdateFormSubmit() {
    console.log("onProduitUpdateFormSubmit");
    console.log(this.produit.fournisseurs);
    console.log("this.fournisseurs", this.fournisseurs);
    const idFournisseurs = [...this.produit.fournisseurs.map((obj: any) => obj.id)];
    console.log("idFournisseurs = ", idFournisseurs);
    this.fournisseurs.setValue(this.getFournisseursIdsValues());
    this.categorie.setValue(this.getCategorieIdValue());
    this.type.setValue(this.getTypeIdValue());

    // Création d'un formData pour l'envoi des données
    this.submitData();

    console.log("Valid=", this.produitForm.valid, "Ensuite", this.produitForm);

    // On met la variable submitted à true
    this.submitted = true;

    // Si le formulaire produitForm est valide, on labce la requête
    if (this.produitForm.valid) {
      console.log("onProduitFormSubmit valid");
      this.produitService.update2(
        this.produitFormData
      ).pipe(first()).subscribe(
        data => {
          if(data.id) {
            console.log("Objet mis à jour", data);
            // this.onProduitFormReset();
            this.router.navigate(['/produits'])
            this.toastrService.success("Produit mis à jour avec succès", "Mise à jour du produit");
            console.log("Produit mis à jour avec succès", "Mise à jour du produit");
            this.errorProduitForm = null;
          } else {
            console.log("erreur", data);
            this.errorProduitForm = data;
            this.toastrService.error("Echec de la mise à jour du produit", "Mise à jour du produit")
          }

        }
      )
    }
  }

  onProduitFormReset() {
    this.submitted = false;
    this.produitForm.reset();
  }

  transform(value: unknown, index: number, array: unknown[]) {
    // Vérifiez que value est bien une chaîne avant de la convertir en entier
    console.log("val = ", (value as string).substring(2), "index = ", index, "array = ", array)
    if (typeof value === 'string') {
      const spaceIndex = value.indexOf(' ');  // Récupération de l'index de l'espace blanc
      // const firstWord = value.substring(0, spaceIndex);  // Les caractères avant l'espace blanc. NB: il y a l'index suivi de deux points
                                                            // et un espace blanc avant la valeur exemple : "1: 3"
      const value_to_return = value.substring(spaceIndex + 1);  // Les caractères après l'espace blanc
      console.log("Transform =", value_to_return);
      return parseInt(value_to_return, 10);
    }
    console.log("Transform = ", value);
    return value;
  }

  getFournisseursIdsValues() {
    // Récupérez les valeurs sélectionnées en utilisant la méthode val() de jQuery
    // const val = $(this.fournisseurs_ids.nativeElement).val()?.toString();
    const val = $(this.fournisseurs_ids.nativeElement).val();
    console.log(val);
    console.log($(this.fournisseurs_ids.nativeElement));
    return (Object.values(val as {}).map(this.transform));
  }

  getTypeIdValue() {
    // Récupérez les valeurs sélectionnées en utilisant la méthode val() de jQuery
    const val = $(this.type_id.nativeElement).val();
    console.log(val)
    return (parseInt(val as string, 10));
  }

  getCategorieIdValue() {
    // Récupérez les valeurs sélectionnées en utilisant la méthode val() de jQuery
    const val = $(this.categorie_id.nativeElement).val();
    console.log(val)
    return (parseInt(val  as string, 10));
  }

}
