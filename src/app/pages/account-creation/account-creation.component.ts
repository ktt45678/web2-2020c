import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { ManagementService } from '../../services/management.service';
import { NotificationService } from '../../services/notification.service';
import { UserModel } from '../../modules/models/user.model';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-account-creation',
  templateUrl: './account-creation.component.html',
  styleUrls: ['./account-creation.component.scss'],
  providers: [ManagementService]
})
export class AccountCreationComponent implements OnInit {
  loading = false;
  userId: string;
  selectedUser: UserModel;
  accountSelectionForm: FormGroup;
  checkingAccountForm: FormGroup;
  savingsAccountForm: FormGroup;
  accountType: string;
  accountCurrency: string;
  accountId: string;

  constructor(private route: ActivatedRoute, private manage: ManagementService, private notification: NotificationService, private location: Location) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('userid');
    this.manage.findUser(this.userId).subscribe(user => this.selectedUser = user);
    this.accountSelectionForm = new FormGroup({
      type: new FormControl('', [Validators.required]),
      currency: new FormControl('', [Validators.required])
    });
  }

  createCheckingAccountForm() {
    const owner = `${this.selectedUser.firstName} ${this.selectedUser.lastName} - ${this.selectedUser.citizenIdentificationId}`;
    const minValue = this.accountCurrency === 'VND' ? 500000 : 23;
    this.checkingAccountForm = new FormGroup({
      owner: new FormControl(owner, [Validators.required]),
      balance: new FormControl('', [Validators.required, Validators.min(minValue)])
    });
  }

  createSavingAccountForm() {
    const owner = `${this.selectedUser.firstName} ${this.selectedUser.lastName} - ${this.selectedUser.citizenIdentificationId}`;
    const minValue = this.accountCurrency === 'VND' ? 500000 : 23;
    this.savingsAccountForm = new FormGroup({
      owner: new FormControl(owner, [Validators.required]),
      balance: new FormControl('', [Validators.required, Validators.min(minValue)]),
      term: new FormControl('', [Validators.required])
    });
  }

  get selectCurrency() { return this.accountSelectionForm.get('currency'); }
  get selectType() { return this.accountSelectionForm.get('type'); }

  get checkingOwner() { return this.checkingAccountForm.get('owner'); }
  get checkingBalance() { return this.checkingAccountForm.get('balance'); }

  get savingOwner() { return this.savingsAccountForm.get('owner'); }
  get savingBalance() { return this.savingsAccountForm.get('balance'); }
  get savingTerm() { return this.savingsAccountForm.get('term'); }

  onSelectAccount(accountData) {
    if (this.accountSelectionForm.invalid) {
      return;
    }
    this.accountType = accountData.type;
    this.accountCurrency = accountData.currency;
    if (accountData.type === '0') {
      this.createCheckingAccountForm();
      return;
    }
    this.createSavingAccountForm();
  }

  onCheckingAccount(accountData) {
    if (this.checkingAccountForm.invalid) {
      return;
    }
    this.loading = true;
    this.checkingAccountForm.disable();
    this.manage.createAccount(this.userId, this.accountType, this.accountCurrency, accountData.balance).pipe(first()).subscribe(
    data => {
      this.accountId = data.accountId;
      this.checkingAccountForm.enable();
      this.afterRespone();
      this.accountType = 'done';
    }, error => {
      const message = JSON.parse(JSON.stringify(error));
      this.notification.showError(message[0]?.code || message?.code);
      this.checkingAccountForm.enable();
      this.afterRespone();
    });
  }

  onSavingAccount(accountData) {
    if (this.savingsAccountForm.invalid) {
      return;
    }
    this.loading = true;
    this.savingsAccountForm.disable();
    this.manage.createAccount(this.userId, this.accountType, this.accountCurrency, accountData.balance, accountData.term).pipe(first()).subscribe(
    data => {
      this.accountId = data.accountId;
      this.savingsAccountForm.enable();
      this.afterRespone();
      this.accountType = 'done';
    }, error => {
      const message = JSON.parse(JSON.stringify(error));
      this.notification.showError(message[0]?.code || message?.code);
      this.savingsAccountForm.enable();
      this.afterRespone();
    });
  }

  afterRespone() {
    this.loading = false;
  }

  cancel() {
    this.accountType = null;
    this.accountCurrency = null;
  }

  return() {
    this.location.back();
  }

}
