import { AuthenticationServiceService } from './../Services/authentication-service.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
export class NotConnectedInterceptor implements HttpInterceptor {

  constructor(
    private authenticationService: AuthenticationServiceService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  /**
   * Intercept the request
   */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    // Check the status
    return next.handle(request).pipe(catchError(err => {

      // If cont connected
      if (err.status === 401) {

        // auto logout if 401 response returned from api
        this.authenticationService.logout();

        // Redirect
        this.router.navigate(['/login' , {}]);
      }

      const error = err.error.message || err.statusText;
      return throwError(error);
    }));
  }
}
