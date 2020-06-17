import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()

export class UserService {
    constructor(private http: HttpClient) {
    }

    auth() {
        //Login go here
        let options = {
            headers: new HttpHeaders().set(
                "Content-Type",
                "application/x-www-form-urlencoded"
            )
        }
        return this.http.post("http://localhost:3000/api/login", options);
    }
}