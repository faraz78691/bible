import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authToken = localStorage.getItem('token');

    if (authToken) {
      let modifiedHeaders = request.headers
        .set('Authorization', `Bearer ${authToken}`)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Access-Control-Allow-Origin', '*');

      request = request.clone({
        headers: modifiedHeaders
      });
    } else {
      let modifiedHeaders = request.headers
        .set('Authorization', `Bearer ${authToken}`)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Access-Control-Allow-Origin', '*');

      request = request.clone({
        headers: modifiedHeaders
      });

    }

    return next.handle(request);
  }
}
