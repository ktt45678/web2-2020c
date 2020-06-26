import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';

import { AuthenticationService } from '../../services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthenticationService]
})
export class LoginComponent implements OnInit {
  hidePassword = true;
  loading = false;
  error = '';
  loginForm;
  ngOnInit(): void {}
  constructor(private auth: AuthenticationService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }

  onSubmit(loginData) {
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.auth.login(loginData).subscribe(data => {
      this.router.navigate(['/dashboard']);
    }, error => {
      this.loading = false;
      this.error = error;
    });
  }

}
