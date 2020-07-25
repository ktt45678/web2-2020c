import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable()
export class ReCaptchaService {

  constructor(private http: HttpClient) {}

  verify(token) {
    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    const body = new URLSearchParams();
    body.set('recaptcha', token);
    return this.http.post<any>(`${environment.apiUrl}/api/recaptcha`, body.toString(), { headers });
  }
}