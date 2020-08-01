import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ManagementService } from '../../services/management.service'
import { NotificationService } from '../../services/notification.service'
import { UserModel } from '../../models/user.model';
import { UserImage } from '../../models/user-image.model';
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
  selectedUserAvatar: UserImage;
  submittedIdCards: UserImage[];

  constructor(private route: ActivatedRoute, private router: Router, private manage: ManagementService, private notification: NotificationService, private location: Location) { }

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

  editUser() {
    this.router.navigate(['../..', 'edit', this.userId], { relativeTo: this.route });
  }

  approveUser() {
    this.manage.verifyUser(this.userId, 1).pipe(first()).subscribe(
    () => {
      this.notification.showSuccess('Đã phê duyệt thành công');
      this.afterRespone();
    }, error => {
      this.notification.showError('Đã có lỗi xảy ra');
    });
  }

  declineUser() {
    this.manage.verifyUser(this.userId, 0).pipe(first()).subscribe(
    () => {
      this.notification.showSuccess('Đã từ chối phê duyệt');
      this.afterRespone();
    }, error => {
      this.notification.showError('Đã có lỗi xảy ra');
    });
  }

  afterRespone() {
    this.selectedUser.approveStatus = 1;
    this.manage.removeSubmittedIdCards(this.userId).subscribe();
  }

  openUri(uri) {
    window.open(uri, '_blank');
  }

  return() {
    this.location.back();
  }

}
