import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';


import { AccountModel } from '../modules/models/account.model';
import { UserImageModel } from '../modules/models/user-image.model';
import { UserModel } from '../modules/models/user.model';

@Injectable()
export class ManagementService {

  constructor(private http: HttpClient) { }

  createAccount(userId, type, currency, balance, term?) {
    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    const body = new URLSearchParams();
    body.set('userId', userId);
    body.set('type', type);
    body.set('currency', currency);
    body.set('balance', balance);
    body.set('term', term || null);
    return this.http.post<AccountModel>(`${environment.apiUrl}/api/createaccount`, body.toString(), { headers });
  }

  updateAccount(accountId, currency, status) {
    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    const body = new URLSearchParams();
    body.set('accountId', accountId);
    body.set('currency', currency);
    body.set('status', status);
    return this.http.post(`${environment.apiUrl}/api/updateaccount`, body.toString(), { headers });
  }

  updateAccountStatus(accountId, status) {
    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    const body = new URLSearchParams();
    body.set('accountId', accountId);
    body.set('status', status);
    return this.http.post(`${environment.apiUrl}/api/updateaccount`, body.toString(), { headers });
  }

  findAccount(accountId: string) {
    const params = { accountId };
    return this.http.get<AccountModel>(`${environment.apiUrl}/api/getaccountinfo`, { params });
  }

  findAccounts(userId: string, start = 0, limit = 10, type = '', keyword = '') {
    const params = {
      userId: userId,
      start: start.toString(),
      limit: limit.toString(),
      type: type,
      keyword: keyword
    }
    return this.http.get<any>(`${environment.apiUrl}/api/getuseraccount`, { params });
  }

  findAuditLog(start: string, limit: string, userId: string, type: string) {
    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    const body = new URLSearchParams();
    body.set('start', start);
    body.set('limit', limit);
    body.set('userId', userId);
    body.set('type', type);
    return this.http.post(`${environment.apiUrl}/api/getaudit`, body.toString(), { headers });
  }

  findAvatar(userId: string) {
    const params = { userId };
    return this.http.get<UserImageModel[]>(`${environment.apiUrl}/api/upload/avatars`, { params });
  }

  findSubmittedIdCards(userId: string) {
    const params = { userId };
    return this.http.get<UserImageModel[]>(`${environment.apiUrl}/api/upload/idcards`, { params });
  }

  findUser(id: string) {
    const params = { id };
    return this.http.get<UserModel>(`${environment.apiUrl}/api/getuserinfo`, { params });
  }

  findUsers(start = 0, limit = 10, type = 'user', keyword = '') {
    const params = {
      start: start.toString(),
      limit: limit.toString(),
      type: type,
      keyword: keyword
    };
    return this.http.get<any>(`${environment.apiUrl}/api/search`, { params });
  }

  payIn(accountId, payIdData) {
    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    const body = new URLSearchParams();
    body.set('accountId', accountId);
    body.set('balance', payIdData.amount);
    body.set('currencyType', payIdData.type);
    return this.http.post(`${environment.apiUrl}/api/addbalance`, body.toString(), { headers });
  }

  updateUser(userId, editData) {
    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    const body = new URLSearchParams();
    body.set('userId', userId);
    body.set('firstName', editData.firstname);
    body.set('lastName', editData.lastname);
    body.set('dateOfBirth', editData.birth.format('DD/MM/YYYY'));
    body.set('address', editData.address);
    body.set('username', editData.username);
    body.set('phoneNumber', editData.tel);
    body.set('citizenIdentificationId', editData.idNumber);
    body.set('identificationType', editData.cardType);
    body.set('issueDate', editData.issueDate?.format('DD/MM/YYYY'));
    body.set('userType', editData.userType);
    body.set('approveStatus', editData.approvalStatus);
    body.set('status', editData.userStatus);
    return this.http.post(`${environment.apiUrl}/api/updateuserinfo`, body.toString(), { headers });
  }

  updateUserStatus(userId, userStatus) {
    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    const body = new URLSearchParams();
    body.set('userId', userId);
    body.set('status', userStatus);
    return this.http.post(`${environment.apiUrl}/api/updateuserinfo`, body.toString(), { headers });
  }

  verifyUser(userId, approvalStatus) {
    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    const body = new URLSearchParams();
    body.set('userId', userId);
    body.set('approveStatus', approvalStatus);
    return this.http.post(`${environment.apiUrl}/api/verifyuser`, body.toString(), { headers });
  }

  removeSubmittedIdCards(userId) {
    const params = { userId };
    return this.http.delete(`${environment.apiUrl}/api/upload/idcards`, { params });
  }

}