import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { TokenModel } from '../models/token.model';
import { UserModel } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<UserModel>;
  public currentUser: Observable<UserModel>;
  
  constructor(private http: HttpClient) {
    const user = new JwtHelperService().decodeToken(this.accessTokenValue);
    this.currentUserSubject = new BehaviorSubject<UserModel>(user);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get accessTokenValue() {
    return JSON.parse(localStorage.getItem('token'));
  }

  public get currentUserValue(): UserModel {
    return this.currentUserSubject.value;
  }

  getCurrentUser() {
    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    const params = { type: 'basic' };
    return this.http.post<UserModel>(`${environment.apiUrl}/api/getinfo`, {}, { headers, params }).pipe(map(user => {
      return user;
    }));
  }

  setCurrentUser(user: UserModel) {
    this.currentUserSubject.next(user);
  }

  register(registerData) {
    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    const body = new URLSearchParams();
    body.set('firstName', registerData.firstname);
    body.set('lastName', registerData.lastname);
    body.set('email', registerData.email);
    body.set('username', registerData.username);
    body.set('dateOfBirth', registerData.birth.format('DD/MM/YYYY'));
    body.set('phoneNumber', registerData.tel);
    body.set('address', registerData.address);
    body.set('password', registerData.password);
    body.set('confirmPassword', registerData.confirmpassword);
    return this.http.post(`${environment.apiUrl}/api/register`, body.toString(), { headers });
  }

  activate(token) {
    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    const body = new URLSearchParams();
    body.set('activeCode', token);
    return this.http.post(`${environment.apiUrl}/api/auth/active`, body.toString(), { headers });
  }

  passwordRecovery(recoveryData) {
    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    const body = new URLSearchParams();
    body.set('email', recoveryData.email);
    return this.http.post(`${environment.apiUrl}/api/forgotpassword`, body.toString(), { headers });
  }

  validatePasswordRecovery(token) {
    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    const body = new URLSearchParams();
    body.set('forgotCode', token);
    return this.http.post(`${environment.apiUrl}/api/verifyforgotcode`, body.toString(), { headers });
  }

  resetPassword(resetPasswordData, token) {
    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    const body = new URLSearchParams();
    body.set('newPassword', resetPasswordData.password);
    body.set('confirmPassword', resetPasswordData.confirmpassword);
    body.set('forgotCode', token);
    return this.http.post(`${environment.apiUrl}/api/updatenewpassword`, body.toString(), { headers });
  }

  renewToken() {
    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    return this.http.post<TokenModel>(`${environment.apiUrl}/api/renew-token`, {}, { headers }).pipe(map(data => {
      localStorage.setItem('token', JSON.stringify(data.token));
      const user = new JwtHelperService().decodeToken(data.token);
      this.currentUserSubject.next(user);
      return data;
    }));
  }

  login(loginData) {
    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    const body = new URLSearchParams();
    body.set('username', loginData.username);
    body.set('password', loginData.password);
    return this.http.post<TokenModel>(`${environment.apiUrl}/api/auth/login`, body.toString(), { headers }).pipe(map(data => {
      localStorage.setItem('token', JSON.stringify(data.token));
      const user = new JwtHelperService().decodeToken(data.token);
      this.currentUserSubject.next(user);
      return data;
    }));
  }

  logout() {
    // Remove user from local storage to log user out
    this.http.get(`${environment.apiUrl}/api/auth/logout`).subscribe();
    this.currentUserSubject.next(null);
    localStorage.removeItem('token');
    localStorage.removeItem('task_finished');
    localStorage.removeItem('job_claimed');
  }
}