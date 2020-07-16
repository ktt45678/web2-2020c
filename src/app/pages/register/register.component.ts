import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../../services/authentication.service';
import { ReCaptchaService } from '../../services/recaptcha.service';
import { RecaptchaComponent } from 'ng-recaptcha';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [AuthenticationService, ReCaptchaService]
})
export class RegisterComponent implements OnInit {
  @ViewChild('captchaRef') captchaRef: RecaptchaComponent;
  loading = false;
  returnUrl: string;
  error = '';
  hidePassword = true;
  registerForm;
  constructor(private auth: AuthenticationService, private reCaptcha: ReCaptchaService, private formBuilder: FormBuilder, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      birth: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      tel: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmpassword: new FormControl('', [Validators.required]),
      recaptcha: new FormControl('', [Validators.required])
    });
  }

  get firstname() { return this.registerForm.get('firstname'); }
  get lastname() { return this.registerForm.get('lastname'); }
  get birth() { return this.registerForm.get('birth'); }
  get username() { return this.registerForm.get('username'); }
  get tel() { return this.registerForm.get('tel'); }
  get address() { return this.registerForm.get('address'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get confirmpassword() { return this.registerForm.get('confirmpassword'); }

  onSubmit(captchaResponse: string, registerData) {
    if (this.registerForm.invalid) {
      return;
    }
    this.loading = true;
    this.reCaptcha.verify(captchaResponse).pipe(first()).subscribe(
      data => {
      },
      error => {
        this.snackBar.open('Lỗi xác thực captcha', 'Đóng', { duration: 10000 });
        this.captchaRef.reset();
        return;
      }
    );
    this.auth.register(registerData).pipe(first()).subscribe(
    data => {
      this.snackBar.open('Đăng kí thành công, vui lòng kiểm tra email của bạn', 'Đóng', { duration: 10000 });
    }, error => {
      const message = JSON.parse(JSON.stringify(error));
      this.snackBar.open(message[0] ? message[0].message : message ? message.message : "Đã có lỗi xảy ra", 'Đóng', { duration: 10000 });
    });
    this.loading = false;
    this.captchaRef.reset();
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

}
