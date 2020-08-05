import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service';
import { UserService } from '../../services/user.service';

@Injectable({ providedIn: 'root' })
export class ActivateGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthenticationService, private user: UserService) { }

  canActivate(route: ActivatedRouteSnapshot) {
    const currentUser = this.auth.currentUserValue;
    // Logged in
    if (currentUser) {
      // Find user activation status
      this.user.findStatus().subscribe(status => {
        // Activated so return true
        if (status.approveStatus !== 0 && status.emailVerified !== 0) {
          return true;
        }
        // Not activated so
        this.router.navigate(['/403']);
        return false;
      });
    }

    // Not logged in so
    this.router.navigate(['/403']);
    return false;
  }
}