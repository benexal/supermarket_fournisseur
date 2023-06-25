import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Emitters } from './emitters/emitters';
import { AuthService } from './services/auth.service';
import { WebSocketService } from './services/web-socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'supermarket';
  authenticated = false;

  constructor(public webSocket: WebSocketService, public _router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    // this.webSocket.listen().subscribe((data) => {
    //   console.log(data);
    // })

    console.log("Moi");

    this.authService.autoLogin();
    Emitters.authEmitter.subscribe(
      (auth: boolean) => {
        this.authenticated = auth;
      }
    )
    console.log(this.authService.is_authenticated.value);
    // if (this.authenticated === false) {
    //   console.log("not connected");
    //   this._router.navigateByUrl("/login");
    // } else {
    //   console.log("connected");
    //   this._router.navigateByUrl("/dashboard");
    // }
    if (!this.authService.is_authenticated.value) {
      console.log("not connected");
      this._router.navigateByUrl("/login");
    } else {
      console.log("connected");
      // this._router.navigateByUrl("/dashboard");

      this.webSocket.listen();

      setTimeout(() => {
        if (this.webSocket.chatSocket.readyState === 1) {
          this.webSocket.emit("Hello");
        }
      }, 2000);
    }
  }
}
