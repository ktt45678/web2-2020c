import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

import { StatusModel } from '../models/status.model';

@Injectable({ providedIn: 'root' })
export class UserService {

  constructor(private http: HttpClient) {}

  public get taskFinished(): Boolean {
    return JSON.parse(localStorage.getItem('task_finished'));
  }
  
  updateIdCard(updateData) {
    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    const body = new URLSearchParams();
    body.set('identificationType', updateData.cardType);
    body.set('citizenIdentificationId', updateData.idNumber);
    body.set('issueDate', updateData.issueDate.format('DD/MM/YYYY'));
    return this.http.post(`${environment.apiUrl}/api/updateidcard`, body.toString(), { headers });
  }

  sendActivationEmail() {
    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    const body = new URLSearchParams();
    return this.http.post(`${environment.apiUrl}/api/resend`, body.toString(), { headers });
  }

  requestManager() {
    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    const body = new URLSearchParams();
    return this.http.post(`${environment.apiUrl}/api/requeststaff`, body.toString(), { headers });
  }

  findManager() {
    return this.http.get(`${environment.apiUrl}/api/requeststaff`);
  }

  findStatus() {
    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    const params = { type: 'status' };
    return this.http.get<StatusModel>(`${environment.apiUrl}/api/getinfo`, { headers, params }).pipe(map(status => {
      localStorage.setItem('task_finished', JSON.stringify(status.approveStatus !== 0 && status.emailVerified !== 0));
      return status;
    }));
  }
  
}