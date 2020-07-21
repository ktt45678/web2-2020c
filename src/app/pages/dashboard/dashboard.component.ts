import { Component, OnInit, OnDestroy } from '@angular/core';

import { AuthenticationService } from '../../services/authentication.service';
import { UserService } from '../../services/user.service';
import { UserModel } from 'src/app/models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  currentUser: UserModel;

  constructor(private auth: AuthenticationService, private user: UserService) {}

  ngOnInit(): void {
    this.currentUser = this.auth.currentUserValue;
  }

  ngOnDestroy() {
  }
}
