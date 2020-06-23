import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()

export class UserService {
  constructor(private http: HttpClient) { }
  // Moved to authentication.service
}