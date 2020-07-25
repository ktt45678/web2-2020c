import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {

  constructor(private http: HttpClient) {}
  
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
    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    return this.http.get(`${environment.apiUrl}/api/requeststaff`, { headers });
  }
  
}