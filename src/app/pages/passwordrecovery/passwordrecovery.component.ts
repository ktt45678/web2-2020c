import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';

import { AuthenticationService } from '../../services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-passwordrecovery',
  templateUrl: './passwordrecovery.component.html',
  styleUrls: ['./passwordrecovery.component.scss']
})
export class PasswordRecoveryComponent implements OnInit {
  loading = false;
  hasToken = false;
  hidePassword = true;
  error = '';
  recoveryForm;
  resetPasswordForm;
  ngOnInit(): void {}
  constructor(private authentication: AuthenticationService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) {
    this.recoveryForm = new FormGroup({
      email: new FormControl('', [Validators.required])
    });
    this.resetPasswordForm = new FormGroup({
      password: new FormControl('', [Validators.required]),
      confirmpassword: new FormControl('', [Validators.required])
    });
  }

  get email() { return this.recoveryForm.get('email'); }
  get password() { return this.resetPasswordForm.get('password'); }
  get confirmpassword() { return this.resetPasswordForm.get('confirmpassword'); }

  onRecovry(recoveryData) {
    if (this.recoveryForm.invalid) {
      return;
    }
    this.loading = true;
  }
  onResetPassword(resetPasswordData) {
    if (this.resetPasswordForm.invalid) {
      return;
    }
    this.loading = true;
  }
}
