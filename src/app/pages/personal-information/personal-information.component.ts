import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { UserService } from '../../services/user.service'
import { NotificationService } from '../../services/notification.service'
import { UserModel } from '../../modules/models/user.model';
import { UserImageModel } from '../../modules/models/user-image.model';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss']
})
export class PersonalInformationComponent implements OnInit {
  currentUser: UserModel;
  currentUserAvatar: UserImageModel;

  constructor(private user: UserService, private notification: NotificationService, private location: Location) { }

  ngOnInit(): void {
    this.user.findInfo().subscribe(data => this.currentUser = data, error => this.showError(error));
    this.user.findAvatar().subscribe(avatars => {
      this.currentUserAvatar = avatars[0];
    });
  }

  showError(error) {
    const message = JSON.parse(JSON.stringify(error));
    this.notification.showError(message[0]?.code || message?.code);
  }

  openUri(uri) {
    window.open(uri, '_blank');
  }

  return() {
    this.location.back();
  }

}
