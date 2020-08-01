import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MediaMatcher } from '@angular/cdk/layout';
import { tap, first } from 'rxjs/operators';
import * as _moment from 'moment';

import { AuthenticationService } from '../../services/authentication.service';
import { ManagementService } from '../../services/management.service'
import { NotificationService } from '../../services/notification.service';
import { UserModel } from '../../models/user.model';
import { regex } from '../../modules/template/regex-pattern.module';

@Component({
  selector: 'app-user-modification',
  templateUrl: './user-modification.component.html',
  styleUrls: ['./user-modification.component.scss'],
  providers: [ManagementService]
})
export class UserModificationComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  userId: string;
  loading = false;
  editorForm: FormGroup;
  selectedUser: UserModel;
  currentUser: UserModel;
  isSelfEdit = false;

  constructor(private route: ActivatedRoute, private auth: AuthenticationService, private manage: ManagementService, private location: Location, private notification: NotificationService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    const moment = _moment;
    this.currentUser = this.auth.currentUserValue;
    this.editorForm = new FormGroup({
      firstname: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.pattern(regex.displayName)]),
      lastname: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.pattern(regex.displayName)]),
      birth: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]),
      username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(regex.username)]),
      tel: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(regex.tel)]),
      idNumber: new FormControl(''),
      cardType: new FormControl(''),
      issueDate: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.minLength(5), Validators.email]),
      userType: new FormControl('', [Validators.required]),
      approvalStatus: new FormControl('', [Validators.required]),
      userStatus: new FormControl('', [Validators.required])
    });
    this.userId = this.route.snapshot.paramMap.get('userid');
    this.manage.findUser(this.userId).pipe(tap((user: UserModel) => {
      this.editorForm.patchValue({
        firstname: user.firstName,
        lastname: user.lastName,
        birth: moment(user.dateOfBirth, 'DD/MM/YYYY'),
        address: user.address,
        username: user.username,
        tel: user.phoneNumber,
        idNumber: user.citizenIdentificationId,
        cardType: user.identificationType,
        issueDate: user.issueDate ? moment(user.issueDate, 'DD/MM/YYYY') : null,
        email: user.email,
        userType: user.userType.toString(),
        approvalStatus: user.approveStatus.toString(),
        userStatus: user.status.toString()
      });
      if (user.id === this.currentUser.id) {
        this.isSelfEdit = true;
      }
    })).subscribe(data => this.selectedUser = data);
  }

  get firstname() { return this.editorForm.get('firstname'); }
  get lastname() { return this.editorForm.get('lastname'); }
  get birth() { return this.editorForm.get('birth'); }
  get address() { return this.editorForm.get('address'); }
  get username() { return this.editorForm.get('username'); }
  get tel() { return this.editorForm.get('tel'); }
  get idNumber() { return this.editorForm.get('idNumber'); }
  get cardType() { return this.editorForm.get('cardType'); }
  get issueDate() { return this.editorForm.get('issueDate'); }
  get email() { return this.editorForm.get('email'); }
  get userType() { return this.editorForm.get('userType'); }
  get approvalStatus() { return this.editorForm.get('approvalStatus'); }
  get userStatus() { return this.editorForm.get('userStatus'); }

  onSubmit(editData) {
    if (this.editorForm.invalid) {
      return;
    }
    this.loading = true;
    this.editorForm.disable();
    this.manage.updateUser(this.userId, editData).pipe(first()).subscribe(
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
    if (this.isSelfEdit) {
      this.auth.renewToken().pipe(first()).subscribe();
    }
    this.loading = false;
    this.editorForm.enable();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
