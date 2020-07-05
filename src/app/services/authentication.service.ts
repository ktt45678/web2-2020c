import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { TokenModel } from '../models/token.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private accessTokenSubject: BehaviorSubject<TokenModel>;
  public accessToken: Observable<TokenModel>;

  constructor(private http: HttpClient, private router: Router) {
    this.accessTokenSubject = new BehaviorSubject<TokenModel>(JSON.parse(localStorage.getItem('token')));
    this.accessToken = this.accessTokenSubject.asObservable();
  }

  public get accessTokenValue(): TokenModel {
    this.accessTokenSubject.next(JSON.parse(localStorage.getItem('token')));
    return this.accessTokenSubject.value;
  }

  register(registerData) {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const body = new URLSearchParams();
    body.set('firstName', registerData.firstname);
    body.set('lastName', registerData.lastname);
    body.set('email', registerData.email);
    body.set('username', registerData.username);
    body.set('dateOfBirth', registerData.birth.format('DD/MM/YYYY'));
    body.set('phoneNumber', registerData.tel);
    body.set('address', registerData.address);
    body.set('password', registerData.password);
    body.set('confirmPassword', registerData.password);
    body.set('clientId', environment.clientId);
    body.set('secretKey', environment.clientSecret);
    return this.http.post(`${environment.apiUrl}/api/register`, body.toString(), { headers });
  }

  activate(token) {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const body = new URLSearchParams();
    body.set('activeCode', token);
    body.set('clientId', environment.clientId);
    body.set('secretKey', environment.clientSecret);
    return this.http.post(`${environment.apiUrl}/api/auth/active`, body.toString(), { headers });
  }

  login(loginData) {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const body = new URLSearchParams();
    body.set('username', loginData.username);
    body.set('password', loginData.password);
    body.set('clientId', environment.clientId);
    body.set('secretKey', environment.clientSecret);
    return this.http.post<TokenModel>(`${environment.apiUrl}/api/auth/login`, body.toString(), { headers }).pipe(map(data => {
      localStorage.setItem('token', JSON.stringify(data));
      this.accessTokenSubject.next(data);
      return data;
    }));
  }

  logout() {
    // Remove user from local storage to log user out
    localStorage.removeItem('token');
    this.accessTokenSubject.next(null);
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const params = new HttpParams();
    params.set('clientId', environment.clientId);
    params.set('secretKey', environment.clientSecret);
    this.http.get(`${environment.apiUrl}/api/auth/logout`, { headers, params });
    this.router.navigate(['/']);
  }
}