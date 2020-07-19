import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service';
import { UserService } from '../../services/user.service';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-mat-sidenav',
  templateUrl: './mat-sidenav.component.html',
  styleUrls: ['./mat-sidenav.component.scss']
})
export class MatSidenavComponent implements OnInit {
  shouldRun = true;
  currentUser: UserModel;

  constructor(private router: Router, private auth: AuthenticationService, private user: UserService) {
    this.currentUser = auth.currentUserValue;
  }

  ngOnInit(): void {
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}
