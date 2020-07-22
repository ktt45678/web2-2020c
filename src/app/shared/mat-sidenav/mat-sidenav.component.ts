import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

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
  currentUser: Observable<UserModel>;

  constructor(private router: Router, private auth: AuthenticationService, private user: UserService) {
  }

  ngOnInit(): void {
    this.currentUser = this.auth.currentUser;
  }

  ngOnDestroy() {
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}
