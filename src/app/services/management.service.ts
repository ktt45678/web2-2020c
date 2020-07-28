import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class ManagementService {

  constructor(private http: HttpClient) { }

  findUsers(start = 0, limit = 10, type = 'user', keyword = '') {
    const params = {
      start: start.toString(),
      limit: limit.toString(),
      type: type,
      keyword: keyword
    };
    return this.http.get<any>(`${environment.apiUrl}/api/search`, { params });
  }

}