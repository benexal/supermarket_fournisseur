import { Component, ElementRef, OnInit } from '@angular/core';
import { User } from 'src/app/classes/user';
import { AuthService } from 'src/app/services/auth.service';
import { CommandeService } from 'src/app/services/commande.service';
//import { Commande } from 'src/app/interfaces/Commande';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: User | null = null;
 // commandes!: Commande[];
  notifications!: number;
  message!: string;
  intervalId!: any;



  constructor(private elementRef: ElementRef,
               private authService: AuthService,
               private commandeService: CommandeService,
               private router: Router) { }

  ngOnInit(): void {


    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/plugins/perfect-scrollbar/js/perfect-scrollbar.js";
    this.elementRef.nativeElement.appendChild(s);

    var s2 = document.createElement("script");
    s2.type = "text/javascript";
    s2.src = "../assets/js/app.js";
    this.elementRef.nativeElement.appendChild(s2);

    this.getUserConnected();

    // this.getNewCommandeArrived();
    // this.verifyIfNewCommnde();
  }

  getUserConnected() {
    if (this.authService.is_authenticated.value) {
      this.user = this.authService.user;
    }
  }

  logout() {
    this.authService.logout();
  }



  // getNewCommandeArrived(){
  //   this.commandeService.getAllCommandeByFournisseur()
  //   .subscribe((data: Commande[]) => {
  //     if(this.commandes.length< data.length){
  //       this.notifications=data.length-this.commandes.length;
  //       this.message ="vous avez "+ this.notifications+" nouvelles commandes";

  //     }
  //   })
  // }

  // verifyIfNewCommnde() {
  //   this.intervalId = setInterval(() => {
  //     this.getNewCommandeArrived(); // Fetch updated list of products every minute
  //   }, 60000);
  // }

  // clearNotification(){
  //   this.notifications=0;
  //   this.router.navigateByUrl("livraison");

  // }

}
