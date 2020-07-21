import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { SidenavService } from '../../services/component.service';
import { AuthenticationService } from '../../services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-mat-header',
  templateUrl: './mat-header.component.html',
  styleUrls: ['./mat-header.component.scss']
})
export class MatHeaderComponent implements OnInit, OnDestroy {
  shouldRun = true;
  isDashboard = false;
  currentUser: UserModel;
  currentUserSubscription: Subscription;

  constructor(private router: Router, private sideNavService: SidenavService, private auth: AuthenticationService, private user: UserService) {}

  ngOnInit(): void {
    this.currentUserSubscription = this.auth.currentUser.subscribe(user => this.currentUser = user);
    if (this.router.url.startsWith('/dashboard')) {
      this.isDashboard = true;
    }
  }

  ngOnDestroy() {
    this.currentUserSubscription.unsubscribe();
  }

  openSideNav() {
    this.sideNavService.open();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}
