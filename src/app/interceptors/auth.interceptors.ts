import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any> > {
    const authToken = this.authService.getToken();
    if(typeof(authToken) === "undefined") {
      return next.handle(req);
    }

    const modifiedReq = req.clone({
      headers: req.headers.set('Authorization', `token ${authToken}`)
    });
    console.log(modifiedReq.headers);
    return next.handle(modifiedReq);
  }
}
