import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class UploadService {

  constructor(private http: HttpClient) { }

  preview(file: File): Observable<string> {
    const sub = new Subject<string>();
    const reader = new FileReader();      
    reader.readAsDataURL(file);
    reader.onload = () =>
    {
      const content: string = reader.result as string;
      sub.next(content);
      sub.complete();
    }
    return sub.asObservable();
  }

  validateImage(file: File) {
    const mimeType = file.type;
    if (mimeType !== 'image/png' && mimeType !== 'image/gif' && mimeType !== 'image/jpeg' && mimeType !== 'image/bmp') {
      return false;
    }
    return true;
  }

  validateTrack(file: File) {
    const mimeType = file.type;
    if (mimeType !== 'audio/mpeg' && mimeType !== 'audio/wav' && mimeType !== 'audio/x-wav' && mimeType !== 'audio/wave' && mimeType !== 'audio/aac' && mimeType !== 'audio/opus' && mimeType !== 'audio/ogg' && mimeType !== 'audio/flac' && mimeType !== 'audio/x-flac') {
      return false;
    }
    return true;
  }

  idcard(file: File) {
    const body = new FormData();
    body.set('idcard', file);
    return this.http.post<any>(`${environment.apiUrl}/api/upload/idcard`, body, { reportProgress: true, observe: 'events' });
  }

  avatar(file: File) {
    const body = new FormData();
    body.set('avatar', file);
    return this.http.post<any>(`${environment.apiUrl}/api/upload/avatar`, body, { reportProgress: true, observe: 'events' });
  }

  audio(file: File) {
    const body = new FormData();
    body.set('audio', file);
    return this.http.post<any>(`${environment.apiUrl}/api/upload/audio`, body, { reportProgress: true, observe: 'events' });
  }

  createUri() {

  }
}