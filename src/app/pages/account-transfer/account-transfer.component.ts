import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { AuthenticationService } from '../../services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { NotificationService } from 'src/app/services/notification.service';
import { TransferModel } from '../../modules/models/transfer.model';
import { UserModel } from '../../modules/models/user.model';
import { AccountModel } from '../../modules/models/account.model';
import { BankModel } from '../../modules/models/bank.model';

@Component({
  selector: 'app-account-transfer',
  templateUrl: './account-transfer.component.html',
  styleUrls: ['./account-transfer.component.scss'],
  providers: [TransactionService]
})
export class AccountTransferComponent implements OnInit {
  loading = false;
  stage: string;
  currentUser: UserModel;
  currentUserAccounts: AccountModel[];
  availableBanks: BankModel[];
  transferData: TransferModel;
  methodSelectionForm: FormGroup;
  intraBankTransferForm: FormGroup;
  interBankTransferForm: FormGroup;
  confirmationForm: FormGroup;

  constructor(private auth: AuthenticationService, private user: UserService, private transaction: TransactionService, private notification: NotificationService, private location: Location) { }

  ngOnInit(): void {
    this.currentUser = this.auth.currentUserValue;
    this.methodSelectionForm = new FormGroup({
      method: new FormControl('', [Validators.required])
    });
  }

  createIntraBankTransferForm() {
    this.intraBankTransferForm = new FormGroup({
      from: new FormControl('', [Validators.required]),
      to: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required]),
      description: new FormControl('')
    });
  }

  createInterBankTransferForm() {
    this.interBankTransferForm = new FormGroup({
      from: new FormControl('', [Validators.required]),
      to: new FormControl('', [Validators.required]),
      bank: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required]),
      description: new FormControl('')
    });
  }

  createConfirmationForm() {
    this.confirmationForm = new FormGroup({
      otp: new FormControl('', [Validators.required])
    });
  }

  get method() { return this.methodSelectionForm.get('method'); }

  get intraFrom() { return this.intraBankTransferForm.get('from'); }
  get intraTo() { return this.intraBankTransferForm.get('to'); }
  get intraAmount() { return this.intraBankTransferForm.get('amount'); }
  get intraDescription() { return this.intraBankTransferForm.get('description'); }

  get interFrom() { return this.interBankTransferForm.get('from'); }
  get interTo() { return this.interBankTransferForm.get('to'); }
  get interBank() { return this.interBankTransferForm.get('bank'); }
  get interAmount() { return this.interBankTransferForm.get('amount'); }
  get interDescription() { return this.interBankTransferForm.get('description'); }

  get otp() { return this.confirmationForm.get('otp'); }

  onSelectMethod(selectData) {
    if (this.methodSelectionForm.invalid) {
      return;
    }
    if (selectData.method === 'intra') {
      this.createIntraBankTransferForm()
    }
    if (selectData.method === 'inter') {
      this.createInterBankTransferForm();
      this.user.findBank().subscribe(data => this.availableBanks = data.list);
    }
    this.transaction.findCheckingAccounts().subscribe(data => this.currentUserAccounts = data);
    this.stage = selectData.method;
  }

  onIntraBankTransfer(transferData) {
    if (this.intraBankTransferForm.invalid) {
      return;
    }
    this.transferData = {
      method: '1',
      from: transferData.from,
      to: transferData.to,
      amount: transferData.amount,
      description: transferData.description
    };
    // Stuff about currency
    this.transferData.currency = this.currentUserAccounts.find(x => x.accountId === transferData.from).currencyType;
    const amountMin = this.transferData.currency === 'VND' ? 20000 : 1;
    if (this.transferData.amount < amountMin) {
      this.notification.showInfo('Số tiền gửi tối thiểu là 20,000đ hoặc $1');
      return;
    }
    this.createConfirmationForm();
    this.transaction.findFee(this.transferData.from, this.transferData.amount, this.transferData.method).subscribe(data => {
      this.transferData.fee = Number(data.fee);
    });
    this.transaction.requestOTP().subscribe();
    this.stage = 'confirm';
  }

  onInterBankTransfer(transferData) {
    if (this.interBankTransferForm.invalid) {
      return;
    }
    this.transferData = {
      method: '0',
      from: transferData.from,
      to: transferData.to,
      bank: transferData.bank,
      amount: transferData.amount,
      description: transferData.description
    };
    this.transferData.currency = this.currentUserAccounts.find(x => x.accountId === transferData.from).currencyType;
    const amountMin = this.transferData.currency === 'VND' ? 20000 : 1;
    if (this.transferData.amount < amountMin) {
      this.notification.showInfo('Số tiền gửi tối thiểu là 20,000đ hoặc $1');
      return;
    }
    this.createConfirmationForm();
    this.transaction.findFee(this.transferData.from, this.transferData.amount, this.transferData.method).subscribe(data => {
      this.transferData.fee = Number(data.fee);
    });
    this.transaction.requestOTP().subscribe();
    this.stage = 'confirm';
  }

  onConfirmation(transferData) {
    if (this.confirmationForm.invalid) {
      return;
    }
    this.confirmationForm.disable();
    this.loading = true;
    if (this.transferData.method === '1') {
      this.transaction.intraBankTransfer(this.transferData, transferData.otp).subscribe(
      () => {
        this.stage = 'done';
        this.afterRespone();
      }, error => {
        this.showError(error);
        this.afterRespone();
      });
    } else {
      this.transaction.interBankTransfer(this.transferData, transferData.otp).subscribe(
      () => {
        this.stage = 'done';
        this.afterRespone();
      }, error => {
        this.showError(error);
        this.afterRespone();
      });
    }
  }

  showError(error) {
    const message = JSON.parse(JSON.stringify(error));
    this.notification.showError(message[0]?.code || message?.code);
  }

  afterRespone() {
    this.loading = false;
    this.confirmationForm.enable();
  }

  edit() {
    this.stage = this.transferData.method === '1' ? 'intra' : 'inter';
  }

  cancel() {
    this.stage = null;
    this.transferData = null;
  }

  return() {
    this.location.back();
  }
}
