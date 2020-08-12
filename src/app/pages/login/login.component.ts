import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../../services/authentication.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  step = 1;
  hidePassword = true;
  loading = false;
  returnUrl: string;
  loginForm: FormGroup;
  twoFactorAuthForm: FormGroup;

  constructor(private auth: AuthenticationService, private notification: NotificationService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private snackBar: MatSnackBar) {
    if (this.auth.currentUserValue) {
      this.router.navigate(['/dashboard']);
    }
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
    this.returnUrl = this.route.snapshot.queryParams['continue'] || '/dashboard';
  }

  createTwoFactorAuthForm() {
    this.twoFactorAuthForm = new FormGroup({
      code: new FormControl('', [Validators.required])
    });
  }

  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }

  get code() { return this.twoFactorAuthForm.get('code'); }

  onSubmit(loginData) {
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.loginForm.disable();
    this.auth.login(loginData).pipe(first()).subscribe(
    data => {
      this.notification.close();
      if (data.enable2fa) {
        this.createTwoFactorAuthForm();
        this.step = 2;
        this.loginForm.enable();
        this.afterRespone();
        return;
      }
      this.router.navigate([this.returnUrl]);
    }, error => {
      const message = JSON.parse(JSON.stringify(error));
      this.notification.showError(message[0]?.code || message?.code);
      this.loginForm.enable();
      this.afterRespone();
    });
  }

  onTwoFactorAuth(loginData) {
    if (this.twoFactorAuthForm.invalid) {
      return;
    }
    this.loading = true;
    this.twoFactorAuthForm.disable();
    this.auth.twoFactorAuth(loginData).pipe(first()).subscribe(
    () => {
      this.notification.close();
      this.router.navigate([this.returnUrl]);
    }, error => {
      const message = JSON.parse(JSON.stringify(error));
      this.notification.showError(message[0]?.code || message?.code);
      this.twoFactorAuthForm.enable();
      this.afterRespone();
    });
  }

  cancel() {
    this.step = 1;
  }

  afterRespone() {
    this.loading = false;
  }

}
