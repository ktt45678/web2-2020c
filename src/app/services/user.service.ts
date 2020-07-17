import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

import { AuthenticationService } from '../services/authentication.service';
import { UserModel } from '../models/user.model';

@Injectable({providedIn: 'root'})

export class UserService {
  accessToken: string;
  constructor(private http: HttpClient, private auth: AuthenticationService) {
    this.accessToken = auth.getToken();
  }

  getCurrentUser() {
    const body = new URLSearchParams();
    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded', 'token': this.accessToken});
    body.set('clientId', environment.clientId);
    body.set('secretKey', environment.clientSecret);
    return this.http.post<any>(`${environment.apiUrl}/api/getinfo`, body.toString(), { headers }).pipe(map(data => {
      return data.user;
    }));
  }
}