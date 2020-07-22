import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthenticationService } from '../../services/authentication.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-passwordrecovery',
  templateUrl: './passwordrecovery.component.html',
  styleUrls: ['./passwordrecovery.component.scss']
})
export class PasswordRecoveryComponent implements OnInit {
  loading = false;
  hasToken = false;
  hidePassword = true;
  token: string;
  recoveryForm;
  resetPasswordForm;
  
  constructor(private auth: AuthenticationService, private notification: NotificationService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private snackBar: MatSnackBar) {
    this.recoveryForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });
    this.resetPasswordForm = new FormGroup({
      password: new FormControl('', [Validators.required]),
      confirmpassword: new FormControl('', [Validators.required])
    });
  }

  get email() { return this.recoveryForm.get('email'); }
  get password() { return this.resetPasswordForm.get('password'); }
  get confirmpassword() { return this.resetPasswordForm.get('confirmpassword'); }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParams['token'];
    if (this.token) {
      this.auth.validatePasswordRecovery(this.token).pipe(first()).subscribe(data => {
        this.hasToken = true;
      }, error => {
        this.notification.showError('Liên kết khôi phục mật khẩu không hợp lệ');
      });
    }
  }

  onRecovery(recoveryData) {
    if (this.recoveryForm.invalid) {
      return;
    }
    this.loading = true;
    this.auth.passwordRecovery(recoveryData).pipe(first()).subscribe(
    data => {
      this.notification.showSuccess('Liên kết khôi phục mật khẩu đang được gửi tới Email của bạn');
      this.afterRespone();
    }, error => {
      const message = JSON.parse(JSON.stringify(error));
      this.notification.showError(message[0]?.message || message?.message);
      this.afterRespone();
    });
  }
  
  onResetPassword(resetPasswordData) {
    if (this.resetPasswordForm.invalid) {
      return;
    }
    this.loading = true;
    this.auth.resetPassword(resetPasswordData, this.token).pipe(first()).subscribe(
    data => {
      this.notification.showSuccess('Mật khẩu đã được cập nhật thành công');
      this.afterRespone();
    }, error => {
      const message = JSON.parse(JSON.stringify(error));
      this.notification.showError(message[0]?.message || message?.message);
      this.afterRespone();
    });
  }

  afterRespone() {
    this.loading = false;
  }
}
