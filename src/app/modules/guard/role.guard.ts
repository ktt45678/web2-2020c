import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthenticationService) { }

  canActivate(route: ActivatedRouteSnapshot) {
    const currentUser = this.auth.currentUserValue;
    // Only authorized users can access
    if (currentUser.userType === 0) {
      return true;
    }

    // Not authorized so
    this.router.navigate(['/dashboard']);
    return false;
  }
}