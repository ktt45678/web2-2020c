import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as _moment from 'moment';

import { AuthenticationService } from '../../services/authentication.service';
import { UserService } from '../../services/user.service'
import { NotificationService } from '../../services/notification.service';
import { UserModel } from 'src/app/models/user.model';
import { regex } from '../../modules/template/regex-pattern.module';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-personal-modification',
  templateUrl: './personal-modification.component.html',
  styleUrls: ['./personal-modification.component.scss']
})
export class PersonalModificationComponent implements OnInit, OnDestroy {
  uploadTrack = false;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  currentUser: UserModel;
  loading = false;
  updateInfoForm: FormGroup;

  constructor(private auth: AuthenticationService, private user: UserService, private notification: NotificationService, private location: Location, private route: ActivatedRoute, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    const moment = _moment;
    this.currentUser = this.auth.currentUserValue;
    this.uploadTrack = this.route.snapshot.queryParams['track'] === 'yes';
    this.updateInfoForm = new FormGroup({
      firstname: new FormControl(this.currentUser.firstName, [Validators.required, Validators.maxLength(20), Validators.pattern(regex.displayName)]),
      lastname: new FormControl(this.currentUser.lastName, [Validators.required, Validators.maxLength(20), Validators.pattern(regex.displayName)]),
      birth: new FormControl(moment(this.currentUser.dateOfBirth, 'DD/MM/YYYY'), [Validators.required]),
      username: new FormControl(this.currentUser.username, [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(regex.username)]),
      tel: new FormControl(this.currentUser.phoneNumber, [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(regex.tel)]),
      email: new FormControl(this.currentUser.email, [Validators.required, Validators.minLength(5), Validators.email]),
      address: new FormControl(this.currentUser.address, [Validators.required, Validators.minLength(6), Validators.maxLength(100)])
    });
  }

  get firstname() { return this.updateInfoForm.get('firstname'); }
  get lastname() { return this.updateInfoForm.get('lastname'); }
  get birth() { return this.updateInfoForm.get('birth'); }
  get username() { return this.updateInfoForm.get('username'); }
  get tel() { return this.updateInfoForm.get('tel'); }
  get email() { return this.updateInfoForm.get('email'); }
  get address() { return this.updateInfoForm.get('address'); }

  onSubmit(updateData) {
    if (this.updateInfoForm.invalid) {
      return;
    }
    this.loading = true;
    this.updateInfoForm.disable();
    this.user.updateUser(this.currentUser.id, updateData).pipe(first()).subscribe(
    () => {
      this.notification.showSuccess('Thay đổi thông tin thành công');
      this.afterRespone();
    }, error => {
      const message = JSON.parse(JSON.stringify(error));
      this.notification.showError(message[0]?.message || message?.message);
      this.afterRespone();
    });
  }

  return() {
    this.location.back();
  }

  afterRespone() {
    this.auth.renewToken().pipe(first()).subscribe();
    this.loading = false;
    this.updateInfoForm.enable();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
