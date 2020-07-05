import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthenticationService } from '../services/authentication.service';

import { UserModel } from '../models/user.model';
import { TokenModel } from '../models/token.model';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  accessToken: string;
  constructor(private http: HttpClient, private auth: AuthenticationService) {
    this.accessToken = auth.accessTokenValue.token;
  }

  getCurrentUser() {
    console.log(this.accessToken);
  }
}