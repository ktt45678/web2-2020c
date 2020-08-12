import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AccountModel } from '../modules/models/account.model';
import { UserModel } from '../modules/models/user.model';
import { StatusModel } from '../modules/models/status.model';
import { UserImageModel } from '../modules/models/user-image.model';
import { UserStorageModel } from '../modules/models/user-storage.model';

@Injectable({ providedIn: 'root' })
export class UserService {

  private userAvatarSubject: BehaviorSubject<UserImageModel>;
  public userAvatar: Observable<UserImageModel>;
  private userAudioSubject: BehaviorSubject<UserStorageModel>;
  public userAudio: Observable<UserStorageModel>;

  constructor(private http: HttpClient) {
    this.userAvatarSubject = new BehaviorSubject<UserImageModel>(null);
    this.userAvatar = this.userAvatarSubject.asObservable();
    this.userAudioSubject = new BehaviorSubject<UserStorageModel>(null);
    this.userAudio = this.userAudioSubject.asObservable();
  }
  
  updateIdCard(updateData) {
    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    const body = new URLSearchParams();
    body.set('identificationType', updateData.cardType);
    body.set('citizenIdentificationId', updateData.idNumber);
    body.set('issueDate', updateData.issueDate.format('DD/MM/YYYY'));
    return this.http.post(`${environment.apiUrl}/api/updateidcard`, body.toString(), { headers });
  }

  updatePassword(updateData) {
    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    const body = new URLSearchParams();
    body.set('currentPassword', updateData.currentpassword);
    body.set('newPassword', updateData.newpassword);
    body.set('confirmPassword', updateData.confirmpassword);
    return this.http.post(`${environment.apiUrl}/api/changepassword`, body.toString(), { headers });
  }

  updateUser(userId, updateData) {
    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    const body = new URLSearchParams();
    body.set('userId', userId);
    body.set('firstName', updateData.firstname);
    body.set('lastName', updateData.lastname);
    body.set('dateOfBirth', updateData.birth.format('DD/MM/YYYY'));
    body.set('username', updateData.username);
    body.set('phoneNumber', updateData.tel);
    body.set('email', updateData.email);
    body.set('address', updateData.address);
    body.set('enable2fa', updateData.twofactorauth ? '1' : '0');
    body.set('enableNoti', updateData.noticestatus ? '1' : '0');
    return this.http.post(`${environment.apiUrl}/api/updateinfo`, body.toString(), { headers });
  }

  sendActivationEmail() {
    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    return this.http.post(`${environment.apiUrl}/api/resend`, {}, { headers });
  }

  requestManager() {
    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    return this.http.post(`${environment.apiUrl}/api/requeststaff`, {}, { headers });
  }

  findAccount(id: string) {
    const params = { id };
    return this.http.get<AccountModel>(`${environment.apiUrl}/api/getaccountinfo`, { params });
  }

  findAccounts(start = 0, limit = 10, type = '', keyword = '') {
    const params = {
      start: start.toString(),
      limit: limit.toString(),
      type: type,
      keyword: keyword
    }
    return this.http.get<any>(`${environment.apiUrl}/api/getaccount`, { params });
  }

  findAvatar() {
    return this.http.get<UserImageModel[]>(`${environment.apiUrl}/api/upload/avatars`).pipe(tap(avatars => {
      this.userAvatarSubject.next(avatars[0]);
    }));
  }

  findAudio() {
    return this.http.get<UserStorageModel[]>(`${environment.apiUrl}/api/upload/audios`).pipe(tap(audios => {
      this.userAudioSubject.next(audios[0]);
    }));
  }

  findBanks() {
    return this.http.get<any>(`${environment.apiUrl}/api/getbanklist`);
  }

  findInfo(type = 'full') {
    const params = { type };
    return this.http.get<UserModel>(`${environment.apiUrl}/api/getinfo`, { params });
  }

  findManager() {
    return this.http.get<any>(`${environment.apiUrl}/api/requeststaff`);
  }

  findStatus() {
    const params = { type: 'status' };
    return this.http.get<StatusModel>(`${environment.apiUrl}/api/getinfo`, { params });
  }
  
}