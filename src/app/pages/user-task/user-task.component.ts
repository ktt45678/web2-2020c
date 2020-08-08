import { Component, OnInit, OnDestroy } from '@angular/core';
import { first } from 'rxjs/operators';

import { NotificationService } from '../../services/notification.service';
import { UserService } from '../../services/user.service';
import { StatusModel } from '../../modules/models/status.model';

@Component({
  selector: 'app-user-task',
  templateUrl: './user-task.component.html',
  styleUrls: ['./user-task.component.scss']
})
export class UserTaskComponent implements OnInit, OnDestroy {
  userStatus: StatusModel;
  canRequestManager = false;

  constructor(private user: UserService, private notification: NotificationService) { }

  ngOnInit(): void {
    this.user.findStatus().pipe(first()).subscribe(data => {
      this.userStatus = data;
    });
    this.user.findManager().pipe(first()).subscribe(data => {
      const result = JSON.parse(JSON.stringify(data));
      if (result.count === 0) {
        this.canRequestManager = true;
      }
    });
  }

  sendActivationEmail() {
    this.user.sendActivationEmail().pipe(first()).subscribe(
    () => {
      this.notification.showSuccess("Đã gửi email kích hoạt, vui lòng kiểm tra hộp thư của bạn");
    }, error => {
      this.showError(error);
    });
  }

  isekai() {
    this.user.requestManager().pipe(first()).subscribe(
    () => {
      this.notification.showSuccess("Đăng ký trở thành nhân viên thành công");
      this.canRequestManager = false;
    }, error => {
      this.showError(error);
    });
  }

  showError(error) {
    const message = JSON.parse(JSON.stringify(error));
    this.notification.showError(message[0]?.code || message?.code);
  }

  ngOnDestroy(): void {
  }

}
