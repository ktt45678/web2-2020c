import { Component, OnInit, OnDestroy } from '@angular/core';

import { AuthenticationService } from '../../services/authentication.service';
import { NotificationService } from '../../services/notification.service';
import { UserService } from '../../services/user.service';
import { UserModel } from 'src/app/modules/models/user.model';
import { StatusModel } from 'src/app/modules/models/status.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  currentUser: UserModel;
  currentUserStatus: StatusModel;
  accountCount: number;
  loading = false;
  workClaimed = false;
  userTaskFinished = false;

  constructor(private auth: AuthenticationService, private user: UserService, private notification: NotificationService) {}

  ngOnInit(): void {
    this.currentUser = this.auth.currentUserValue;
    this.user.findStatus().subscribe(status => {
      this.currentUserStatus = status;
      this.userTaskFinished = status.approveStatus === 1 && status.emailVerified !== 0;
    });
    this.user.findManager().subscribe(data => {
      this.workClaimed = data.count > 0;
    });
    this.user.findAccounts(0, 0, '').subscribe(data => {
      this.accountCount = data.count;
    });
  }

  showError(error) {
    const message = JSON.parse(JSON.stringify(error));
    this.notification.showError(message[0]?.code || message?.code);
  }

  afterRespone() {
    this.loading = false;
  }

  ngOnDestroy() {
  }
}
