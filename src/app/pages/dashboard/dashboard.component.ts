import { Component, OnInit, OnDestroy } from '@angular/core';

import { AuthenticationService } from '../../services/authentication.service';
import { NotificationService } from '../../services/notification.service';
import { UserService } from '../../services/user.service';
import { UserModel } from 'src/app/modules/models/user.model';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  currentUser: UserModel;
  loading = false;
  showTask = false;
  timer: any;
  time = new Date();

  constructor(private auth: AuthenticationService, private user: UserService, private notification: NotificationService) {}

  ngOnInit(): void {
    this.currentUser = this.auth.currentUserValue;
    this.showTask = !this.user.taskFinished || !this.user.workClaimed;
    this.timer = setInterval(() => {
      this.time = new Date();
    }, 1000);
  }

  showError(error) {
    const message = JSON.parse(JSON.stringify(error));
    this.notification.showError(message[0]?.code || message?.code);
  }

  afterRespone() {
    this.loading = false;
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }
}
