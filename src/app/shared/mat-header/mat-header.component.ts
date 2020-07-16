import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SidenavService } from '../../services/component.service';
import { AuthenticationService } from '../../services/authentication.service';
import { TokenModel } from 'src/app/models/token.model';

@Component({
  selector: 'app-mat-header',
  templateUrl: './mat-header.component.html',
  styleUrls: ['./mat-header.component.scss']
})
export class MatHeaderComponent implements OnInit {
  shouldRun = true;
  isDashboard = false;
  currentUser: TokenModel;

  constructor(private router: Router, private sideNavService: SidenavService, private auth: AuthenticationService) {}

  ngOnInit(): void {
    if (this.router.url.startsWith('/dashboard')) {
      this.isDashboard = true;
      this.currentUser = this.auth.accessTokenValue;
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
