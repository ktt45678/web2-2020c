import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

import { AuthenticationService } from '../../services/authentication.service'

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private auth: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const accessToken = this.auth.accessTokenValue;
    request = request.clone({
      headers: request.headers.set('Accept', 'application/json').set('clientid', environment.clientId).set('secretkey', environment.clientSecret)
    });
    if (accessToken) {
      request = request.clone({
        headers: request.headers.set('token', accessToken)
      });
    }
    return next.handle(request);
  }
}