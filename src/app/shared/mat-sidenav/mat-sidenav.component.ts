import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service';
import { UserService } from '../../services/user.service';
import { TokenModel } from 'src/app/models/token.model';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-mat-sidenav',
  templateUrl: './mat-sidenav.component.html',
  styleUrls: ['./mat-sidenav.component.scss']
})
export class MatSidenavComponent implements OnInit {
  shouldRun = true;
  currentUser: TokenModel;

  constructor(private router: Router, private auth: AuthenticationService, private user: UserService) {
    this.user.getCurrentUser().pipe(first()).subscribe(
      data => {
        this.currentUser = JSON.parse(JSON.stringify(data));
      }
    );
  }

  ngOnInit(): void {
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}
