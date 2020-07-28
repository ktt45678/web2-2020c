import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class UploadService {

  constructor(private http: HttpClient) { }

  preview(file: File): Observable<String> {
    if (this.validateImage(file)) {
      const sub = new Subject<String>();
      const reader = new FileReader();      
      reader.readAsDataURL(file);
      reader.onload = () =>
      {
        const content: String = reader.result as String;
        sub.next(content);
        sub.complete();
      }
      return sub.asObservable();
    }
  }

  validateImage(file: File) {
    const mimeType = file.type;
    if (mimeType.match(/image\/*/) == null) {
      return false;
    }
    return true;
  }

  idcard(file: File) {
    const body = new FormData();
    body.set('idcard', file);
    return this.http.post<any>(`${environment.apiUrl}/api/upload/idcard`, body, { reportProgress: true, observe: 'events' });
  }

  createUri() {

  }
}