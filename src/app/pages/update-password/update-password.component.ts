import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { UserService } from '../../services/user.service';
import { NotificationService } from '../../services/notification.service';
import { regex } from '../../modules/template/regex-pattern.module';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit {
  loading = false;
  hidePassword = true;
  updatePasswordForm: FormGroup;

  constructor(private user: UserService, private notification: NotificationService, private location: Location) { }

  ngOnInit(): void {
    this.updatePasswordForm = new FormGroup({
      currentpassword: new FormControl('', [Validators.required]),
      newpassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(128), Validators.pattern(regex.password)]),
      confirmpassword: new FormControl('', [Validators.required])
    });
  }

  get currentpassword() { return this.updatePasswordForm.get('currentpassword'); }
  get newpassword() { return this.updatePasswordForm.get('newpassword'); }
  get confirmpassword() { return this.updatePasswordForm.get('confirmpassword'); }

  onUpdatePassword(updateData) {
    if (this.updatePasswordForm.invalid) {
      return;
    }
    this.loading = true;
    this.updatePasswordForm.disable();
    this.user.updatePassword(updateData).pipe(first()).subscribe(
    () => {
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
    this.updatePasswordForm.enable();
  }

  return() {
    this.location.back();
  }

}
