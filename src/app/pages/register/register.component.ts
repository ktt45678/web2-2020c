import { Component, OnInit, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { MediaMatcher } from '@angular/cdk/layout';
import { RecaptchaComponent } from 'ng-recaptcha';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../../services/authentication.service';
import { ReCaptchaService } from '../../services/recaptcha.service';
import { NotificationService } from '../../services/notification.service';
import { regex } from '../../modules/template/regex.pattern';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [ReCaptchaService]
})
export class RegisterComponent implements OnInit, OnDestroy {
  @ViewChild('captchaRef') captchaRef: RecaptchaComponent;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  loading = false;
  returnUrl: string;
  hidePassword = true;
  registerForm: FormGroup;
  defaultImage ="../../../assets/img/placeholder.png";
  lazyloadedImage ="../../../assets/img/signup-image.jpg";
  constructor(private auth: AuthenticationService, private reCaptcha: ReCaptchaService, private notification: NotificationService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      firstname: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.pattern(regex.displayName)]),
      lastname: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.pattern(regex.displayName)]),
      birth: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(regex.username)]),
      tel: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(regex.tel)]),
      address: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]),
      email: new FormControl('', [Validators.required, Validators.minLength(5), Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(128), Validators.pattern(regex.password)]),
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
      this.captchaRef.reset();
      return;
    }
    if (registerData.password !== registerData.confirmpassword) {
      this.notification.showError('Xác nhận mật khẩu không chính xác');
      this.captchaRef.reset();
      return;
    }
    this.loading = true;
    this.registerForm.disable();
    this.reCaptcha.verify(captchaResponse).pipe(first()).subscribe(() => {},
    error => {
      this.notification.showError('Lỗi xác thực captcha');
      this.afterRespone();
      return;
    });
    this.auth.register(registerData).pipe(first()).subscribe(
    () => {
      this.notification.showSuccess('Đăng kí thành công, vui lòng kiểm tra email của bạn');
      this.afterRespone();
    }, error => {
      const message = JSON.parse(JSON.stringify(error));
      this.notification.showError(message[0]?.code || message?.code);
      this.afterRespone();
    });
  }

  afterRespone() {
    this.loading = false;
    this.registerForm.enable();
    this.captchaRef.reset();
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
