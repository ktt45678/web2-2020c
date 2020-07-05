import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { UserModel } from './models/user.model';
import { TokenModel } from './models/token.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentUser: TokenModel;
  constructor(private router: Router, private auth: AuthenticationService) {
    this.auth.accessToken.subscribe(x => this.currentUser = x);
  }
  title = 'WhiteFoo Bank';
}
