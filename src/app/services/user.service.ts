import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class UserService {

  constructor(private http: HttpClient) {}
  
}