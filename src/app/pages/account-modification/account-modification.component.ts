import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { tap, first } from 'rxjs/operators';

import { AuthenticationService } from '../../services/authentication.service';
import { ManagementService } from '../../services/management.service';
import { NotificationService } from '../../services/notification.service';
import { UserModel } from '../../modules/models/user.model';
import { AccountModel } from '../../modules/models/account.model';

@Component({
  selector: 'app-account-modification',
  templateUrl: './account-modification.component.html',
  styleUrls: ['./account-modification.component.scss'],
  providers: [ManagementService]
})
export class AccountModificationComponent implements OnInit {
  loading = false;
  currentUser: UserModel;
  accountId: string;
  selectedAccount: AccountModel;
  payInForm: FormGroup;
  updateAccountForm: FormGroup;
  
  constructor(private route: ActivatedRoute, private auth: AuthenticationService, private manage: ManagementService, private notification: NotificationService, private location: Location) { }

  ngOnInit(): void {
    this.payInForm = new FormGroup({
      amount: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required])
    });
    this.updateAccountForm = new FormGroup({
      currency: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required])
    });
    this.accountId = this.route.snapshot.paramMap.get('accountid');
    this.currentUser = this.auth.currentUserValue;
    this.manage.findAccount(this.accountId).pipe(tap(account => {
      this.updateAccountForm.patchValue({
        currency: account.currencyType,
        status: account.status.toString()
      });
    })).subscribe(account => this.selectedAccount = account);
  }

  get amount() { return this.payInForm.get('amount'); }
  get type() { return this.payInForm.get('type'); }

  get currency() { return this.updateAccountForm.get('currency'); }
  get status() { return this.updateAccountForm.get('status'); }

  onPayIn(payInData) {
    if (this.payInForm.invalid) {
      return;
    }
    this.loading = true;
    this.payInForm.disable();
    this.manage.payIn(this.accountId, payInData).pipe(first()).subscribe(
    () => {
      this.notification.showSuccess(`Đã nạp thành công ${payInData.amount} ${payInData.type} vào tài khoản ${this.accountId}`);
      this.payInForm.enable();
      this.afterRespone();
      // It's unable to pay in again when the savings account is activated, so change status to open
      if (this.selectedAccount.accountType === 1) {
        this.selectedAccount.status = 1;
        this.status.setValue("1");
      }
    }, error => {
      this.showError(error);
      this.payInForm.enable();
      this.afterRespone();
    });
  }

  onUpdateAccount(accountData) {
    if (this.updateAccountForm.invalid) {
      return;
    }
    this.loading = true;
    this.updateAccountForm.disable();
    this.manage.updateAccount(this.accountId, accountData.currency, accountData.status).pipe(first()).subscribe(
    () => {
      this.notification.showSuccess('Thay đổi thông tin thành công');
      this.updateAccountForm.enable();
      this.afterRespone();
      // We need to make sure that it's possible to pay in after deactivating the savings account
      this.selectedAccount.status = Number(accountData.status);
    }, error => {
      this.showError(error);
      this.updateAccountForm.enable();
      this.afterRespone();
    });
  }

  showError(error) {
    const message = JSON.parse(JSON.stringify(error));
    this.notification.showError(message[0]?.code || message?.code);
  }

  afterRespone() {
    this.loading = false;
  }

  return() {
    this.location.back();
  }

}
