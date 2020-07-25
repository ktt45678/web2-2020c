import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first, count } from 'rxjs/operators';

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
  currentUserSubscription: Subscription;
  loading = false;
  canRequestManager = false;

  constructor(private auth: AuthenticationService, private user: UserService, private notification: NotificationService) {}

  ngOnInit(): void {
    this.currentUserSubscription = this.auth.currentUser.subscribe(user => this.currentUser = user);
    this.user.findManager().pipe(first()).subscribe(data => {
      const result = JSON.parse(JSON.stringify(data));
      if (result.count === 0) {
        this.canRequestManager = true;
      }
    });
  }

  sendActivationEmail() {
    this.user.sendActivationEmail().pipe(first()).subscribe(
    data => {
      this.notification.showSuccess("Đã gửi email kích hoạt, vui lòng kiểm tra hộp thư của bạn");
    }, error => {
      this.showError(error);
    });
  }

  isekai() {
    this.user.requestManager().pipe(first()).subscribe(
    data => {
      this.notification.showSuccess("Đăng ký trở thành nhân viên thành công");
    }, error => {
      this.showError(error);
    });
  }

  showError(error) {
    const message = JSON.parse(JSON.stringify(error));
    this.notification.showError(message[0]?.message || message?.message);
  }

  afterRespone() {
    this.loading = false;
  }

  ngOnDestroy() {
    this.currentUserSubscription.unsubscribe();
  }
}
