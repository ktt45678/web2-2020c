import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthenticationService } from '../../services/authentication.service';
import { UserModel } from '../../modules/models/user.model';

@Component({
  selector: 'app-mat-sidenav',
  templateUrl: './mat-sidenav.component.html',
  styleUrls: ['./mat-sidenav.component.scss']
})
export class MatSidenavComponent implements OnInit, OnDestroy {
  currentUser: UserModel;
  currentUserSubscription: Subscription;

  constructor(private router: Router, private auth: AuthenticationService) {}

  ngOnInit(): void {
    this.currentUserSubscription = this.auth.currentUser.subscribe(user => this.currentUser = user);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
  }

}
