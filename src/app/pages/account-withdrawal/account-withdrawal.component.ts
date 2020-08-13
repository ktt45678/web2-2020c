import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { tap } from 'rxjs/operators';

import { AuthenticationService } from '../../services/authentication.service';
import { ManagementService } from 'src/app/services/management.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserModel } from '../../modules/models/user.model';
import { AccountModel } from '../../modules/models/account.model';

@Component({
  selector: 'app-account-withdrawal',
  templateUrl: './account-withdrawal.component.html',
  styleUrls: ['./account-withdrawal.component.scss'],
  providers: [TransactionService, ManagementService]
})
export class AccountWithdrawalComponent implements OnInit {
  loading = false;
  stage: string;
  currentUser: UserModel;
  selectedAccount: AccountModel;
  caWithdrawalForm: FormGroup;
  saWithdrawalForm: FormGroup;

  constructor(private route: ActivatedRoute, private auth: AuthenticationService, private manage: ManagementService, private transaction: TransactionService, private notification: NotificationService, private location: Location) { }

  ngOnInit(): void {
    this.currentUser = this.auth.currentUserValue;
    const accountId = this.route.snapshot.paramMap.get('accountid');
    this.manage.findAccount(accountId).pipe(tap(account => {
      this.selectedAccount = account;
      if (account.accountType === 0) {
        this.createCAWithdrawalForm();
        this.stage = 'checking';
      } else {
        this.createSAWithdrawalForm();
        this.stage = 'savings';
      }
    })).subscribe(() => {}, error => this.showError(error));
  }

  createCAWithdrawalForm() {
    const amountMin = this.selectedAccount.currencyType === 'VND' ? 20000 : 1;
    this.caWithdrawalForm = new FormGroup({
      amount: new FormControl('', [Validators.required, Validators.min(amountMin)]),
      description: new FormControl('')
    });
  }

  createSAWithdrawalForm() {
    this.saWithdrawalForm = new FormGroup({
      description: new FormControl('')
    });
  }

  get caAmount() { return this.caWithdrawalForm.get('amount'); }
  get caDescription() { return this.caWithdrawalForm.get('description'); }

  get saDescription() { return this.saWithdrawalForm.get('description'); }

  onCAWithdrawal(withdrawalData) {
    if (this.caWithdrawalForm.invalid) {
      return;
    }
    this.caWithdrawalForm.disable();
    this.loading = true;
    this.transaction.withdraw(this.selectedAccount.accountId, withdrawalData.description, withdrawalData.amount).subscribe(
    () => {
      this.afterRespone();
      this.caWithdrawalForm.enable();
      // Change local account balance
      this.selectedAccount.balance = (Number(this.selectedAccount.balance) - withdrawalData.amount).toString();
      this.stage = 'done';
    }, error => {
      this.showError(error);
      this.afterRespone();
      this.caWithdrawalForm.enable();
    });
  }

  onSAWithdrawal(withdrawalData) {
    if (this.saWithdrawalForm.invalid) {
      return;
    }
    this.saWithdrawalForm.disable();
    this.loading = true;
    this.transaction.withdraw(this.selectedAccount.accountId, withdrawalData.description).subscribe(
    () => {
      this.afterRespone();
      this.saWithdrawalForm.enable();
      this.stage = 'done';
    }, error => {
      this.showError(error);
      this.afterRespone();
      this.saWithdrawalForm.enable();
    });
  }

  showError(error) {
    const message = JSON.parse(JSON.stringify(error));
    this.notification.showError(message[0]?.code || message?.code);
  }

  afterRespone() {
    this.loading = false;
  }

  cancel() {
    this.stage = this.selectedAccount.accountType === 0 ? 'checking' : 'savings';
  }

  return() {
    this.location.back();
  }

}
