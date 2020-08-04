import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { UserModel } from '../../models/user.model';
import { AuthenticationService } from '../../services/authentication.service';
import { UploadService } from '../../services/upload.service';
import { NotificationService } from '../../services/notification.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-update-idcard',
  templateUrl: './update-idcard.component.html',
  styleUrls: ['./update-idcard.component.scss'],
  providers: [UploadService]
})
export class UpdateIdCardComponent implements OnInit, OnDestroy {

  currentUser: UserModel;
  currentUserSubscription: Subscription;
  loading = false;
  updatetForm: FormGroup;
  uploadProgress = 0;
  selectedFile: File;
  selectedFile2: File;
  previewImage: String;
  previewImage2: String;
  sizeLimit = 8388608;

  constructor(private auth: AuthenticationService, private upload: UploadService, private notification: NotificationService, private user: UserService) { }

  ngOnInit(): void {
    this.currentUserSubscription = this.auth.currentUser.subscribe(user => this.currentUser = user);
    this.updatetForm = new FormGroup({
      cardType: new FormControl('', [Validators.required]),
      idNumber: new FormControl('', [Validators.required]),
      issueDate: new FormControl('', [Validators.required])
    });
  }

  get cardType() { return this.updatetForm.get('cardType'); }
  get idNumber() { return this.updatetForm.get('idNumber'); }
  get issueDate() { return this.updatetForm.get('issueDate'); }

  fileInputChange(fileInputEvent: any) {
    if (fileInputEvent.target.files.length > 0) {
      if (fileInputEvent.target.files[0].size > this.sizeLimit) {
        this.notification.showError('Giới hạn tập tin tải lên là 8MB');
        return;
      }
      this.selectedFile = fileInputEvent.target.files[0];
      this.upload.preview(this.selectedFile).subscribe(data => this.previewImage = data);
    }
  }

  fileInputChange2(fileInputEvent: any) {
    if (fileInputEvent.target.files.length > 0) {
      if (fileInputEvent.target.files[0].size > this.sizeLimit) {
        this.notification.showError('Giới hạn tập tin tải lên là 8MB');
        return;
      }
      this.selectedFile2 = fileInputEvent.target.files[0];
      this.upload.preview(this.selectedFile2).subscribe(data => this.previewImage2 = data);
    }
  }

  clearFile() {
    this.previewImage = null;
    this.selectedFile = null;
  }

  clearFile2() {
    this.previewImage2 = null;
    this.selectedFile2 = null;
  }

  onSubmit(updateData) {
    if (this.updatetForm.invalid) {
      return;
    }
    this.updatetForm.disable();
    this.loading = true;
    // Upload id card photos for standard users
    if (this.currentUser.userType !== 0) {
      if (!this.selectedFile || !this.selectedFile2) {
        this.notification.showError('Bạn chưa cung cấp ảnh chụp');
        this.afterRespone();
        return;
      }
      this.upload.idcard(this.selectedFile).subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            this.uploadProgress = Math.round(event.loaded / event.total * 50);
            break;
        }
      }, error => {
        this.showError(error);
        this.afterRespone();
        return;
      });
      this.upload.idcard(this.selectedFile).subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            this.uploadProgress = 50 + Math.round(event.loaded / event.total * 50);
            break;
        }
      }, error => {
        this.showError(error);
        this.afterRespone();
        return;
      });
    }
    // Update id number
    this.user.updateIdCard(updateData).pipe(first()).subscribe(
    data => {
      this.notification.showSuccess('Yêu cầu cập nhật thành công');
      this.afterRespone();
    }, error => {
      this.showError(error);
      this.afterRespone();
    });
  }

  showError(error) {
    const message = JSON.parse(JSON.stringify(error));
    this.notification.showError(message[0]?.message || message?.message);
  }

  afterRespone() {
    this.updatetForm.enable();
    this.loading = false;
  }

  ngOnDestroy() {
    this.currentUserSubscription.unsubscribe()
  }

}