import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { concat } from 'rxjs';
import { tap } from 'rxjs/operators';

import { UserModel } from '../../models/user.model';
import { AuthenticationService } from '../../services/authentication.service';
import { UploadService } from '../../services/upload.service';
import { NotificationService } from '../../services/notification.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-update-avatar',
  templateUrl: './update-avatar.component.html',
  styleUrls: ['./update-avatar.component.scss'],
  providers: [UploadService]
})
export class UpdateAvatarComponent implements OnInit {
  @Input() uploadTrack: boolean;
  currentUser: UserModel;
  loading = false;
  updatetForm: FormGroup;
  uploadProgress = 0;
  uploadProgressTrack = 0;
  selectedAvatar: File;
  selectedTrack: File;
  previewAvatar: string;
  previewTrack: string;
  sizeLimitAvatar = 8388608;
  sizeLimitTrack = 52428800;

  constructor(private auth: AuthenticationService, private upload: UploadService, private notification: NotificationService, private user: UserService, private location: Location, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.currentUser = this.auth.currentUserValue;
    this.uploadTrack = this.route.snapshot.queryParams['track'] === 'yes';
    this.updatetForm = new FormGroup({
      avatar: new FormControl(''),
      track: new FormControl('')
    });
  }

  get avatar() { return this.updatetForm.get('avatar'); }
  get track() { return this.updatetForm.get('track'); }

  avatarChange(fileInputEvent: any) {
    if (fileInputEvent.target.files.length > 0) {
      if (fileInputEvent.target.files[0].size > this.sizeLimitAvatar) {
        this.notification.showError('Giới hạn ảnh đại diện là 8MB');
        return;
      }
      this.selectedAvatar = fileInputEvent.target.files[0];
      if (!this.upload.validateImage(this.selectedAvatar)) {
        return;
      }
      this.upload.preview(this.selectedAvatar).subscribe(data => this.previewAvatar = data);
    }
  }

  trackChange(fileInputEvent: any) {
    if (fileInputEvent.target.files.length > 0) {
      if (fileInputEvent.target.files[0].size > this.sizeLimitTrack) {
        this.notification.showError('Giới hạn âm thanh là 50MB');
        return;
      }
      this.selectedTrack = fileInputEvent.target.files[0];
      this.upload.preview(this.selectedTrack).subscribe(data => this.previewTrack = data);
    }
  }

  clearAvatar() {
    this.previewAvatar = null;
    this.selectedAvatar = null;
  }

  clearTrack() {
    this.previewTrack = null;
    this.selectedTrack = null;
  }

  onSubmit() {
    if (this.updatetForm.invalid) {
      return;
    }
    this.updatetForm.disable();
    this.loading = true;
    //Upload avatar and track
    const uploadAvatar = this.upload.avatar(this.selectedAvatar).pipe(tap((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.UploadProgress:
          this.uploadProgress = Math.round(event.loaded / event.total * 100);
          break;
        case HttpEventType.Response:
          this.notification.showSuccess('Cập nhật thành công');
          this.afterRespone();
          break;
      }
    }));
    if (this.selectedTrack && this.selectedAvatar) {
      const uploadTrack = this.upload.audio(this.selectedTrack).pipe(tap((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            this.uploadProgress = Math.round(event.loaded / event.total * 100);
            break;
        }
      }));
      // Turn multiple observables into a single observable
      concat(uploadTrack, uploadAvatar).subscribe(() => {}, error => {
        this.showError(error);
        this.afterRespone();
        return;
      });
    } else if (this.selectedTrack) {
      const uploadTrack = this.upload.audio(this.selectedTrack).pipe(tap((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            this.uploadProgress = Math.round(event.loaded / event.total * 100);
            break;
          case HttpEventType.Response:
            this.notification.showSuccess('Cập nhật thành công âm thanh');
            this.afterRespone();
            break;
        }
      }));
      uploadTrack.subscribe(() => {}, error => {
        this.showError(error);
        this.afterRespone();
        return;
      });
    } else {
      uploadAvatar.subscribe(() => {}, error => {
        this.showError(error);
        this.afterRespone();
        return;
      });
    }
  }

  showError(error) {
    const message = JSON.parse(JSON.stringify(error));
    this.notification.showError(message[0]?.code || message?.code);
  }

  afterRespone() {
    this.updatetForm.enable();
    this.loading = false;
    this.uploadProgress = 0;
  }

  return() {
    this.location.back();
  }

}
