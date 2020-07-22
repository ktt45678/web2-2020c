import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hidePassword = true;
  loading = false;
  returnUrl: string;
  loginForm;

  constructor(private auth: AuthenticationService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private snackBar: MatSnackBar) {
    if (this.auth.accessTokenValue) {
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

  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }

  onSubmit(loginData) {
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.auth.login(loginData).pipe(first()).subscribe(
    data => {
      this.router.navigate([this.returnUrl]);
    }, error => {
      const message = JSON.parse(JSON.stringify(error));
      this.snackBar.open(message[0] ? message[0].message : message ? message.message : "Đã có lỗi xảy ra", 'Đóng', { duration: 10000 });
      this.afterRespone();
    });
  }

  afterRespone() {
    this.loading = false;
  }

}
