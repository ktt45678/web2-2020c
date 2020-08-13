import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { NotificationService } from '../../services/notification.service';
import { UserService } from '../../services/user.service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ActivateGuard implements CanActivate {
  constructor(private router: Router, private notification: NotificationService, private user: UserService) { }

  canActivate(route: ActivatedRouteSnapshot) {
    // Find user activation status
    return this.user.findStatus().pipe(map(status => {
      if (status.approveStatus !== 0 && status.emailVerified !== 0) {
        // Account is activated so return true
        return true;
      } else {
        // Not activated so
        this.notification.showInfo('Tính năng này yêu cầu kích hoạt tài khoản');
        return false;
      }
    }), catchError(() => {
      this.notification.showInfo('Đã có lỗi xảy ra');
      return of(false);
    }));
  }
}