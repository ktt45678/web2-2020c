import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ManagementService } from '../../services/management.service'
import { NotificationService } from '../../services/notification.service'
import { UserModel } from '../../modules/models/user.model';
import { UserImageModel } from '../../modules/models/user-image.model';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.scss'],
  providers: [ManagementService]
})
export class UserInformationComponent implements OnInit {
  userId: string;
  selectedUser: UserModel;
  selectedUserAvatar: UserImageModel;
  submittedIdCards: UserImageModel[];

  constructor(private route: ActivatedRoute, private manage: ManagementService, private notification: NotificationService, private location: Location) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('userid');
    this.manage.findUser(this.userId).subscribe(data => this.selectedUser = data);
    this.manage.findSubmittedIdCards(this.userId).subscribe(data => {
      this.submittedIdCards = data;
    });
    this.manage.findAvatar(this.userId).subscribe(avatars => {
      this.selectedUserAvatar = avatars[0];
    });
  }

  approveUser() {
    this.manage.verifyUser(this.userId, 1).pipe(first()).subscribe(
    () => {
      this.notification.showSuccess('Đã phê duyệt thành công');
      this.selectedUser.approveStatus = 1;
      this.afterRespone();
    }, error => {
      this.showError(error);
    });
  }

  declineUser() {
    this.manage.verifyUser(this.userId, 0).pipe(first()).subscribe(
    () => {
      this.notification.showSuccess('Đã từ chối phê duyệt');
      this.selectedUser.approveStatus = 0;
      this.afterRespone();
    }, error => {
      this.showError(error);
    });
  }

  showError(error) {
    const message = JSON.parse(JSON.stringify(error));
    this.notification.showError(message[0]?.code || message?.code);
  }

  afterRespone() {
    this.manage.removeSubmittedIdCards(this.userId).subscribe();
  }

  openUri(uri) {
    window.open(uri, '_blank');
  }

  return() {
    this.location.back();
  }

}
