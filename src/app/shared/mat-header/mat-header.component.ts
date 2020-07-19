import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SidenavService } from '../../services/component.service';
import { AuthenticationService } from '../../services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-mat-header',
  templateUrl: './mat-header.component.html',
  styleUrls: ['./mat-header.component.scss']
})
export class MatHeaderComponent implements OnInit {
  shouldRun = true;
  isDashboard = false;
  currentUser: UserModel;

  constructor(private router: Router, private sideNavService: SidenavService, private auth: AuthenticationService, private user: UserService) {
    this.currentUser = auth.currentUserValue;
  }

  ngOnInit(): void {
    if (this.router.url.startsWith('/dashboard')) {
      this.isDashboard = true;
    }
  }

  openSideNav() {
    this.sideNavService.open();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}
