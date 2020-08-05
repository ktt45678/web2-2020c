import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { tap, first } from 'rxjs/operators';

import { AuthenticationService } from '../../services/authentication.service';
import { ManagementService } from '../../services/management.service';
import { NotificationService } from '../../services/notification.service';
import { UserModel } from '../../models/user.model';
import { AccountModel } from '../../models/account.model';

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
  updateAccountForm: FormGroup;
  
  constructor(private route: ActivatedRoute, private auth: AuthenticationService, private manage: ManagementService, private notification: NotificationService, private location: Location) { }

  ngOnInit(): void {
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

  get currency() { return this.updateAccountForm.get('currency'); }
  get status() { return this.updateAccountForm.get('status'); }

  onUpdateAccount(accountData) {
    if (this.updateAccountForm.invalid) {
      return;
    }
    this.loading = true;
    this.updateAccountForm.disable();
    this.manage.updateAccount(this.accountId, accountData.currency, accountData.status).pipe(first()).subscribe(
    () => {
      this.notification.showSuccess('Thay đổi thông tin thành công');
      this.afterRespone();
    }, error => {
      const message = JSON.parse(JSON.stringify(error));
      this.notification.showError(message[0]?.message || message?.message);
      this.afterRespone();
    });
  }

  afterRespone() {
    this.loading = false;
    this.updateAccountForm.enable();
  }

  return() {
    this.location.back();
  }

}
