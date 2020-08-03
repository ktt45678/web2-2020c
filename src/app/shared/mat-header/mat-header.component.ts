import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { SidenavService } from '../../services/component.service';
import { AuthenticationService } from '../../services/authentication.service';
import { UserService } from '../../services/user.service';
import { UserModel } from '../../models/user.model';
import { UserImage } from '../../models/user-image.model';
import { UserStorage } from '../../models/user-storage.model';

@Component({
  selector: 'app-mat-header',
  templateUrl: './mat-header.component.html',
  styleUrls: ['./mat-header.component.scss']
})
export class MatHeaderComponent implements OnInit, OnDestroy {
  currentUser: UserModel;
  currentUserAvatar: UserImage;
  currentUserAudio: UserStorage;
  currentUserSubscription = new Subscription();
  @Input() allowMenu: Boolean;

  constructor(private router: Router, private sideNavService: SidenavService, private auth: AuthenticationService, private user: UserService) {}

  ngOnInit(): void {
    if (this.allowMenu) {
      this.currentUserSubscription = this.auth.currentUser.subscribe(user => this.currentUser = user);
      this.user.findAvatar().subscribe(avatars => {
        this.currentUserAvatar = avatars[0];
      });
      this.user.findAudio().subscribe(audios => {
        this.currentUserAudio = audios[0];
      });
    }
  }

  openSideNav() {
    this.sideNavService.open();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
  }

}
