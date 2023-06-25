import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/classes/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  user!: User | null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.user = this.getUser();
    // console.log("Hi\n", this.user);
  }

  getUser(): User | null {
    const userJson = localStorage.getItem('currentUser');
    const userData = userJson !== null ? JSON.parse(userJson) : User;
    if (!(userData)) {
      return null;
    } else {
      const loadedUser = new User(
        userData.id, userData.last_name, userData.first_name,
        userData.email, userData.adresse, userData.num_telephone,
        // userData.created_at, userData.updated_at,
        userData.deleted,
        // userData.is_gestionnaire_stock, userData.is_caissier,
        // userData.is_administrateur, userData.is_directeur, userData.is_fournisseur,
        userData.token);

        console.log("Hi 2", userData);

      return loadedUser;
    }
  }

  logout() {
    this.authService.logout();
  }

}
