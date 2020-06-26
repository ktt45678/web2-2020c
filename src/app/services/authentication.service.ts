import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Moment } from 'moment';

import { environment } from '../../environments/environment';
import { TokenModel } from '../models/token.model';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<TokenModel>;
  public currentUser: Observable<TokenModel>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<TokenModel>(JSON.parse(localStorage.getItem('token')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): TokenModel {
    return this.currentUserSubject.value;
  }

  register(registerData) {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const body = new URLSearchParams();
    body.set('firstName', registerData.firstname);
    body.set('lastName', registerData.lastname);
    body.set('email', registerData.email);
    body.set('userName', registerData.username);
    body.set('dateOfBirth', registerData.birth.format('MM-DD-YYYY'));
    body.set('phoneNumber', registerData.tel);
    body.set('address', registerData.address);
    body.set('password', registerData.password);
    body.set('confirmpassword', registerData.password);
    body.set('clientId', environment.clientId);
    body.set('secretKey', environment.clientSecret);
    return this.http.post<any>(`${environment.apiUrl}/api/register`, body.toString(), { headers }).pipe(map(user => {
      return user;
    }));
  }

  login(loginData) {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const body = new URLSearchParams();
    body.set('username', loginData.username);
    body.set('password', loginData.password);
    body.set('clientId', environment.clientId);
    body.set('secretKey', environment.clientSecret);
    return this.http.post<TokenModel>(`${environment.apiUrl}/api/auth/login`, body.toString(), { headers }).pipe(map(user => {
      // Store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('token', JSON.stringify(user.token));
      this.currentUserSubject.next(user);
      return user;
    }));
  }

  logout() {
    // Remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const params = new HttpParams();
    params.set('clientId', environment.clientId);
    params.set('secretKey', environment.clientSecret);
    return this.http.get<any>(`${environment.apiUrl}/api/auth/logout`, { headers, params }).subscribe();
  }
}