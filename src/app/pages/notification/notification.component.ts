import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Produit } from 'src/app/interfaces/produit';
import { ProduitService } from 'src/app/services/produit.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  errorMessage: string = '';
  dtOptions: any = {};
  produits: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    @Inject(ProduitService) private produitService: ProduitService,
  ) { }

  ngOnInit(): void {
    this.getProduitsNotifications();
    this.dtOptions = this.dataTableOption();
  }

  getProduitsNotifications() {
    this.activatedRoute.data.subscribe(
      ({ produits_or_error }) => {
        // ------------------En cas d'erreur, c'est une chaine de caractère qui est renvoyée------------------------------
        console.log(produits_or_error);

        if ((produits_or_error.erreur)) {
          console.log("Problème");
          this.errorMessage = produits_or_error.erreur;
        } else {
          this.produits = produits_or_error.results;
        }
      }
    );
  }

  dataTableOption() {
    return {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      dom: 'Bfrtip',
      buttons: [
        'copy', 'csv', 'excel', 'pdf', 'print', 'colvis'
      ],
    };
  }
}
