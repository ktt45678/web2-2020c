import { Component, OnInit, OnDestroy, Input } from '@angular/core';
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
  @Input() currentUserStatus: StatusModel;
  @Input() workAvailable: boolean;

  constructor(private user: UserService, private notification: NotificationService) { }

  ngOnInit(): void {
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
      this.workAvailable = false;
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
