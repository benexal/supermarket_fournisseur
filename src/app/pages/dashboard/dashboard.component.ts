import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { loadScript } from 'src/app/utils';
import * as ApexCharts from 'apexcharts';
import { LivraisonService } from 'src/app/services/livraison.service';
import { ProduitFournisseur } from 'src/app/interfaces/produitFournisseur';
import { CommandeGet } from 'src/app/interfaces/commandeGet';
import { LigneCommandeGet } from 'src/app/interfaces/ligneCommandeGet';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  loadAPI!: Promise<any>;
  dynamicScripts = ["../assets/plugins/apexcharts-bundle/js/apexcharts.min.js", "../assets/js/index2.js"];
  errorMessage: string = '';
  infos: any;
  allproduitsFounisseurs!: ProduitFournisseur[];
  dictionnaire: { [key: string]: number[] } = {};
  commandes!: CommandeGet[];

  nombreCommandeEnAttentes!: number;
  nombreCommandeEnCours!: number;
  nombreCommandeSuspendues!: number;
  nombreProduits!: number;

  constructor(
    private elementRef: ElementRef,
    private activatedRoute: ActivatedRoute,
    private livraisonService: LivraisonService,
  ) {
    this.loadAPI = new Promise((resolve) => {
      // this.loadScript();
      loadScript(this.dynamicScripts);
      resolve(true);
    });
  }

  ngOnInit() {
 
    this.dictionnaire = {}; 
    this.getAllProduitsAllFournisseur();
  }




  getAllProduitsAllFournisseur(){
    this.livraisonService.getAllProduitsFournisseurs().subscribe(
      (produits: ProduitFournisseur[]) => {
        this.allproduitsFounisseurs = produits;
        this.nombreProduits= this.allproduitsFounisseurs.length;
        this.afficheCommandeByEtat();
      },
      (error: any) => {console.log(error);}
    );
  }



  // afficheCommandeByEtat(){
  //   // d'avoir la liste de commande selon l'etat
  //   this.livraisonService.getAllCommandesByEtat('livree').subscribe(
  //     (commandes: CommandeGet[]) => {
  //       this.commandes = commandes;  
  //       this.createDictionaire();
        

  //     },
  //     (error: any) => {console.log(error);}
  //   );

  //   }



  afficheCommandeByEtat(){
    const etats= ['livree', 'en cours', 'suspendue', 'en attente'];

    etats.forEach((etat: string) => {
      this.livraisonService.getAllCommandesByEtat(etat).subscribe(
        (commandes: CommandeGet[]) =>{
          this.commandes = commandes;
          if(etat=='livree'){
            this.createDictionaire();
          }
          if(etat=='en cours'){
            this.nombreCommandeEnCours=commandes.length;
          }
          if(etat=='suspendue'){
            this.nombreCommandeSuspendues=commandes.length;
          }
          if(etat=='en attente'){
            this.nombreCommandeEnAttentes=commandes.length;
          }

        },
        (error: any) => {console.log(error);}
          
       
      )
    }

    )
   

    }


//dictionnaire avec comme clé le nom du produit, et comme valeur, une liste vide
  createDictionaire(){
    
    this.allproduitsFounisseurs.forEach((produit:ProduitFournisseur) => 
      this.dictionnaire[produit.nom] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
     
    );
    this.remplirDictionnaire();


    // for (const key in this.dictionnaire) {
    //   if (this.dictionnaire.hasOwnProperty(key)) {
    //     const valeur = this.dictionnaire[key];
    //     console.log(`Clé : ${key}, Valeur : ${valeur}`);
    //   }
    // }
    
  }






  remplirDictionnaire() {
    for (const key in this.dictionnaire) {      //parcourir le dictionnaire
      if (this.dictionnaire.hasOwnProperty(key)) {
        this.commandes.forEach((produit: CommandeGet) => {                //pour chaque commande
          produit.lignes_commande.forEach((ligne: LigneCommandeGet) => {    //pou r chaque ligne de commande de commande
            if (ligne.produit_fournisseur.nom === key) {                  //si le nom du produit de ligne de commande
              const month = new Date(produit.created_at).getMonth();
              this.dictionnaire[key][month] += ligne.quantite;
            }
          });
        });
      }
    }
  
    // Affichage du dictionnaire dans la console
    for (const key in this.dictionnaire) {
      if (this.dictionnaire.hasOwnProperty(key)) {
        const valeur = this.dictionnaire[key];
        console.log(`Clé : ${key}, Valeur : ${valeur}`);
      }
    }

    this.getInfosDasboard();
  }
 
  

  getInfosDasboard() {
    this.activatedRoute.data.subscribe(
      ({ infos_or_error }) => {
        // ------------------En cas d'erreur, c'est une chaine de caractère qui est renvoyée------------------------------
        console.log(infos_or_error);

        if ((infos_or_error.erreur)) {
          console.log("Problème");
          this.errorMessage = infos_or_error.erreur;
        } else {
          this.infos = infos_or_error;
          this.loadDiagramme();
        }
      }
    );
  }

  
  importFichiersJS() {
    $(function () {
      var s = document.createElement("script");
      s.type = "text/javascript";
      s.src = "../assets/plugins/apexcharts-bundle/js/apexcharts.min.js";
      // this.elementRef.nativeElement.appendChild(s);
      document.getElementsByTagName('body')[0].appendChild(s);

      var s = document.createElement("script");
      s.type = "text/javascript";
      s.src = "../assets/js/index2.js";
      // this.elementRef.nativeElement.appendChild(s);
      document.getElementsByTagName('body')[0].appendChild(s);
    })
  }

   generateUniqueColors(count: number): string[] {
    const colors: string[] = [];
    for (let i = 0; i < count; i++) {
      // Générez une couleur aléatoire ou utilisez une méthode pour générer des couleurs distinctes
      // Ajoutez la couleur à la liste des couleurs
      colors.push(this.generateRandomColor());
    }
    return colors;
  }
  
  // Fonction pour générer une couleur aléatoire
   generateRandomColor(): string {
    // Générez une couleur aléatoire en utilisant une méthode appropriée
    // Par exemple, vous pouvez utiliser 'rgb', 'hsl', 'hex' ou tout autre format
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }
  
 
  loadDiagramme() {
    const infos = Array.from(this.infos["ventes_annee_courante_par_mois"]);
    console.log("INFOS DANS LOADDIAGRAMME =", infos);
    $(() => {
      "use strict";
      
      const series = Object.entries(this.dictionnaire).map(([key, value]) => ({
        name: key,
        data: value,
      }));
      const couleurs: string[] = this.generateUniqueColors(this.allproduitsFounisseurs.length);

  
      var options = {
        series: series,
        chart: {
          type: 'bar',
          height: 350,
          stacked: true,
          toolbar: {
            show: true
          },
          zoom: {
            enabled: true
          }
        },
        responsive: [{
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0
            }
          }
        }],
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 10,
            dataLabels: {
              total: {
                enabled: true,
                style: {
                  fontSize: '13px',
                  fontWeight: 900
                }
              }
            }
          },
        },
        xaxis: {
          type: 'category',
          categories: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'],
        },
        legend: {
          position: 'right',
          offsetY: 40
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'light',
            gradientToColors: ['#377dff', '#00c9db'],
            shadeIntensity: 1,
            type: 'vertical',
            inverseColors: false,
          
          
            //stops: [0, 50, 65, 91]
          },
        },
        grid: {
          show: true,
          borderColor: '#f8f8f8',
          strokeDashArray: 5,
        },
        colors:couleurs,
      };
  
      var chart = new ApexCharts(document.querySelector("#chart1"), options);
      chart.render();
    });
  }
  
}
