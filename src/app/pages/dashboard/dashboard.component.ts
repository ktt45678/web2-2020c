import { Component, OnInit, OnDestroy } from '@angular/core';

import { AuthenticationService } from '../../services/authentication.service';
import { NotificationService } from '../../services/notification.service';
import { UserService } from '../../services/user.service';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  currentUser: UserModel;
  loading = false;
  showTask = false;

  constructor(private auth: AuthenticationService, private user: UserService, private notification: NotificationService) {}

  ngOnInit(): void {
    this.currentUser = this.auth.currentUserValue;
    this.showTask = !this.user.taskFinished && !this.user.workClaimed;
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
