import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

import { TokenModel } from 'src/app/models/token.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  currentUser: TokenModel;

  constructor(private auth: AuthenticationService) {
    this.currentUser = this.auth.accessTokenValue;
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
  }
}
