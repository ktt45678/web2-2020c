import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SidenavService } from '../../services/component.service';
import { AuthenticationService } from '../../services/authentication.service';
import { TokenModel } from 'src/app/models/token.model';
import { UserService } from 'src/app/services/user.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-mat-header',
  templateUrl: './mat-header.component.html',
  styleUrls: ['./mat-header.component.scss']
})
export class MatHeaderComponent implements OnInit {
  shouldRun = true;
  isDashboard = false;
  currentUser: TokenModel;

  constructor(private router: Router, private sideNavService: SidenavService, private auth: AuthenticationService, private user: UserService) {
    this.user.getCurrentUser().pipe(first()).subscribe(
      data => {
        this.currentUser = JSON.parse(JSON.stringify(data));
      }
    );
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
