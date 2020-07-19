import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './services/authentication.service';
import { UserModel } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentUser: UserModel;
  constructor(private router: Router, private auth: AuthenticationService) {
    auth.currentUser.subscribe(data => { this.currentUser = data });
  }
  title = 'WhiteFoo Bank';
}
