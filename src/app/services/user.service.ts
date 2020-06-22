import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()

export class UserService {
    constructor(private http: HttpClient) {}

    login(username: string, password: string) {
        //Login go here
        const options = {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        }
        const body = new URLSearchParams();
        body.set('email', username);
        body.set('password', password);
        body.set('clientId', environment.clientId);
        body.set('secretKey', environment.clientSecret);
        return this.http.post(environment.apiUrl + '/api/login', body.toString(), options);
    }
}