import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthenticationService } from '../../services/authentication.service';
import { UserService } from '../../services/user.service';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-mat-sidenav',
  templateUrl: './mat-sidenav.component.html',
  styleUrls: ['./mat-sidenav.component.scss']
})
export class MatSidenavComponent implements OnInit, OnDestroy {
  shouldRun = true;
  currentUser: UserModel;
  currentUserSubscription: Subscription;

  constructor(private router: Router, private auth: AuthenticationService, private user: UserService) {
  }

  ngOnInit(): void {
    this.currentUserSubscription = this.auth.currentUser.subscribe(user => this.currentUser = user);
  }

  ngOnDestroy() {
    this.currentUserSubscription.unsubscribe();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}
