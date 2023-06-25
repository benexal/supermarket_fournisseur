import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication-login',
  templateUrl: './authentication-login.component.html',
  styleUrls: ['./authentication-login.component.css']
})
export class AuthenticationLoginComponent implements OnInit {
  loginForm!: any;
  submitted = false;
  errorMessage: string = '';
  loadAPI!: Promise<any>;

  constructor(
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router,
  ) {
    // this.loadAPI = new Promise((resolve) => {
    //   this.removeScript();
    //   resolve(true);
    // });
   }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  get f() {
    // console.warn(this.loginForm.controls);
    return this.loginForm.controls;
  }

  get username() {
    return this.loginForm.get("username");
  }

  get password() {
    return this.loginForm.get("password");
  }

  onSubmit(){
    this.submitted = true;
    // console.warn(this.loginForm.value)
    if(this.f.username.value !== '' && this.f.password.value !== '') {
      this.authService.login(this.f.username.value, this.f.password.value).pipe(first()).subscribe(
        data => {
          console.log(data);
          this.router.navigateByUrl("/dashboard");
          this.toastrService.success("Bienvenue", "Connexion");
        }, (errorRes) => {
          this.errorMessage = errorRes;
        }
      )
      // this.message = this.authService.message;
      console.log(this.authService.message, "hello");
    }
    // else {
    //   this.message = 'JJJ';
    //   console.log(this.message);
    // }
  }

  onReset(): void {
    this.submitted = false;
    this.loginForm.reset();
  }

  public removeScript() {
    var all_scripts: any = document.getElementsByTagName("script");
    var scripts: any = [
      "../assets/js/jquery.min.js",
      "../assets/js/popper.min.js",
      "../assets/js/bootstrap.min.js",
    ];

    for (var j=0; j < all_scripts.length; ++j) {
      // console.log(all_scripts[j].getAttribute('src'),  all_scripts.length);
      if (!((all_scripts[j].getAttribute('src') === "assets/js/jquery.min.js") ||
      (all_scripts[j].getAttribute('src') === "assets/js/popper.min.js") ||
      (all_scripts[j].getAttribute('src') === "assets/js/bootstrap.min.js"))) {
        console.log(all_scripts[j].getAttribute('src'),  all_scripts.length);
        // all_scripts[j].remove();

        // console.log(all_scripts[j].getAttribute('src'),  all_scripts.length);
      }
    }
  }
}
