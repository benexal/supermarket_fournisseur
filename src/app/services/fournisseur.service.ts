import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { HTTP_OPTIONS } from '../urls';
import { handleError } from '../utils';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class FournisseurService extends UserService {

  constructor(http: HttpClient) {
    super(http)
  }

  
}
