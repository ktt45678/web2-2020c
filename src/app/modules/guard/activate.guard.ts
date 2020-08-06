import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service';
import { NotificationService } from '../../services/notification.service';

@Injectable({ providedIn: 'root' })
export class ActivateGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthenticationService, private notification: NotificationService) { }

  canActivate(route: ActivatedRouteSnapshot) {
    const currentUser = this.auth.currentUserValue;
    // Account is activated so return true
    if (currentUser && currentUser.approveStatus !== 0 && currentUser.emailVerified !== 0) {
      return true;
    }

    // Not activated so
    this.notification.showInfo('Tính năng này yêu cầu kích hoạt tài khoản');
    this.router.navigate(['/dashboard']);
    return false;
  }
}