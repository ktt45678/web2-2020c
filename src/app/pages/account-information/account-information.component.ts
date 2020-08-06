import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { AuthenticationService } from '../../services/authentication.service';
import { ManagementService } from '../../services/management.service';
import { UserModel } from '../../modules/models/user.model';
import { AccountModel } from '../../modules/models/account.model';

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

  constructor(private route: ActivatedRoute, private router: Router, private auth: AuthenticationService, private manage: ManagementService, private location: Location) { }

  ngOnInit(): void {
    this.accountId = this.route.snapshot.paramMap.get('accountid');
    this.currentUser = this.auth.currentUserValue;
    this.manage.findAccount(this.accountId).subscribe(account => this.selectedAccount = account);
  }

}
