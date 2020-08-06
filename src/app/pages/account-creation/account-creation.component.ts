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
  selectAccountForm: FormGroup;
  checkingAccountForm: FormGroup;
  savingAccountForm: FormGroup;
  accountType: string;
  accountCurrency: string;
  accountId: string;

  constructor(private route: ActivatedRoute, private manage: ManagementService, private notification: NotificationService, private location: Location) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('userid');
    this.manage.findUser(this.userId).subscribe(user => this.selectedUser = user);
    this.selectAccountForm = new FormGroup({
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
    this.savingAccountForm = new FormGroup({
      owner: new FormControl(owner, [Validators.required]),
      balance: new FormControl('', [Validators.required, Validators.min(minValue)]),
      term: new FormControl('', [Validators.required])
    });
  }

  get selectCurrency() { return this.selectAccountForm.get('currency'); }
  get selectType() { return this.selectAccountForm.get('type'); }

  get checkingOwner() { return this.checkingAccountForm.get('owner'); }
  get checkingBalance() { return this.checkingAccountForm.get('balance'); }

  get savingOwner() { return this.savingAccountForm.get('owner'); }
  get savingBalance() { return this.savingAccountForm.get('balance'); }
  get savingTerm() { return this.savingAccountForm.get('term'); }

  onSelectAccount(accountData) {
    if (this.selectAccountForm.invalid) {
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
    if (this.savingAccountForm.invalid) {
      return;
    }
    this.loading = true;
    this.savingAccountForm.disable();
    this.manage.createAccount(this.userId, this.accountType, this.accountCurrency, accountData.balance, accountData.term).pipe(first()).subscribe(
    data => {
      this.accountId = data.accountId;
      this.savingAccountForm.enable();
      this.afterRespone();
      this.accountType = 'done';
    }, error => {
      const message = JSON.parse(JSON.stringify(error));
      this.notification.showError(message[0]?.code || message?.code);
      this.savingAccountForm.enable();
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
