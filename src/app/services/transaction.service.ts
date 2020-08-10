import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { AccountModel } from '../modules/models/account.model';
import { TransferModel } from '../modules/models/transfer.model';

@Injectable()
export class TransactionService {

  constructor(private http: HttpClient) {}

  findCheckingAccounts() {
    const params = { type: '0' };
    return this.http.get<any>(`${environment.apiUrl}/api/getarr`, { params });
  }

  findBank() {
    return this.http.get<any>(`${environment.apiUrl}/api/getbanklist`);
  }

  findFee(accountId: string, amount: number, method: string) {
    const params = {
      accountId: accountId,
      money: amount.toString(),
      transferType: method
    };
    return this.http.get<any>(`${environment.apiUrl}/api/fee`, { params });
  }

  findTransactions(start = 0, limit = 10, from = '', to = '', type = '', accountId?: string) {
    const params = {
      start: start.toString(),
      limit: limit.toString(),
      fromDate: from,
      toDate: to,
      type: type,
      accountId: accountId ? accountId : null
    };
    if (accountId) {
      return this.http.get<any>(`${environment.apiUrl}/api/getuserlog`, { params });
    }
    return this.http.get<any>(`${environment.apiUrl}/api/getlog`, { params });
  }
  
  requestOTP() {
    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    return this.http.post<any>(`${environment.apiUrl}/api/sendverify`, {}, { headers });
  }

  intraBankTransfer(transferData: TransferModel, otp: string) {
    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    const body = new URLSearchParams();
    body.set('requestAccountId', transferData.from);
    body.set('accountId', transferData.to);
    body.set('money', transferData.amount.toString());
    body.set('message', transferData.description);
    body.set('verifyCode', otp);
    return this.http.post(`${environment.apiUrl}/api/transferinternal`, body.toString(), { headers });
  }

  interBankTransfer(transferData: TransferModel, otp: string) {
    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    const body = new URLSearchParams();
    body.set('requestAccountId', transferData.from);
    body.set('accountId', transferData.to);
    body.set('bankId', transferData.bank);
    body.set('money', transferData.amount.toString());
    body.set('message', transferData.description);
    body.set('verifyCode', otp);
    return this.http.post(`${environment.apiUrl}/api/transferexternal`, body.toString(), { headers });
  }

  withdraw(accountId: string, description: string, amount?: string) {
    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    const body = new URLSearchParams();
    body.set('accountId', accountId);
    body.set('value', amount);
    body.set('message', description);
    return this.http.post(`${environment.apiUrl}/api/withdraw`, body.toString(), { headers });
  }
  
}