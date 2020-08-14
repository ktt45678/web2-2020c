import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { tap } from 'rxjs/operators';

import { AuthenticationService } from '../../services/authentication.service';
import { ManagementService } from '../../services/management.service';
import { NotificationService } from 'src/app/services/notification.service';
import { AccountModel } from '../../modules/models/account.model';
import { RateModel } from '../../modules/models/rate.model';
import { UserModel } from '../../modules/models/user.model';

@Component({
  selector: 'app-account-information',
  templateUrl: './account-information.component.html',
  styleUrls: ['./account-information.component.scss'],
  providers: [ManagementService]
})
export class AccountInformationComponent implements OnInit {
  currentUser: UserModel;
  accountId: string;
  selectedAccount: AccountModel;
  accountRate: RateModel;

  constructor(private route: ActivatedRoute, private auth: AuthenticationService, private manage: ManagementService, private notification: NotificationService, private location: Location) { }

  ngOnInit(): void {
    this.accountId = this.route.snapshot.paramMap.get('accountid');
    this.currentUser = this.auth.currentUserValue;
    this.manage.findAccount(this.accountId).pipe(tap(account => {
      if (account.accountType === 1) { this.findAccountRate(); }
    })).subscribe(account => this.selectedAccount = account, error => this.showError(error));
  }

  findAccountRate() {
    this.manage.findInterestRate(this.accountId).subscribe(rate => this.accountRate = rate, error => this.showError(error));
  }

  showError(error) {
    const message = JSON.parse(JSON.stringify(error));
    this.notification.showError(message[0]?.code || message?.code);
  }

}
