import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { UserService } from '../../services/user.service'
import { NotificationService } from '../../services/notification.service'
import { UserModel } from '../../models/user.model';
import { UserImageModel } from '../../models/user-image.model';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss']
})
export class PersonalInformationComponent implements OnInit {
  currentUser: UserModel;
  currentUserAvatar: UserImageModel;

  constructor(private route: ActivatedRoute, private router: Router, private user: UserService, private notification: NotificationService, private location: Location) { }

  ngOnInit(): void {
    this.user.findInfo().subscribe(data => this.currentUser = data);
    this.user.findAvatar().subscribe(avatars => {
      this.currentUserAvatar = avatars[0];
    });
  }

  openUri(uri) {
    window.open(uri, '_blank');
  }

  return() {
    this.location.back();
  }

}
