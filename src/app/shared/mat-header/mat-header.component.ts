import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';

import { SidenavService } from '../../services/component.service';
import { AuthenticationService } from '../../services/authentication.service';
import { UserService } from '../../services/user.service';
import { UserModel } from '../../modules/models/user.model';
import { UserImageModel } from '../../modules/models/user-image.model';
import { UserStorageModel } from '../../modules/models/user-storage.model';

@Component({
  selector: 'app-mat-header',
  templateUrl: './mat-header.component.html',
  styleUrls: ['./mat-header.component.scss']
})
export class MatHeaderComponent implements OnInit, OnDestroy {
  currentUser: UserModel;
  currentUserAvatar: Observable<UserImageModel>;
  currentUserAudio: Observable<UserStorageModel>;
  currentUserSubscription = new Subscription();
  @Input() allowMenu: Boolean;

  constructor(private router: Router, private sideNavService: SidenavService, private auth: AuthenticationService, private user: UserService) {}

  ngOnInit(): void {
    if (this.allowMenu) {
      this.currentUserAvatar = this.user.userAvatar;
      this.currentUserAudio = this.user.userAudio;
      this.currentUserSubscription = this.auth.currentUser.subscribe(user => this.currentUser = user);
      this.user.findAvatar().subscribe();
      this.user.findAudio().subscribe();
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
