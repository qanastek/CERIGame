import { AlertService } from './alert.service';
import { ConfigService } from './config.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {

  private loggedIn: boolean;
  private logger = new Subject<boolean>();

  constructor(
    private router: Router,
    private http: HttpClient,
    private alert: AlertService,
  ) {

    // const id = localStorage.getItem(ConfigService.currentUser);
    // console.log("here -------------------");

    // if (id) {
    //   this.loggedIn = true;
    //   this.logger.next(this.loggedIn);
    // }
  }

  login(username: string, password: string): any {

    return this.http.post(
      `${ConfigService.apiUrl}/login`,
      { username, "motpasse": password }
    )
    .subscribe((res: any) => {

      console.log("--- res");
      console.log(res);

      localStorage.setItem(ConfigService.currentUser, res.session_id);
      localStorage.setItem(ConfigService.lastConnection, new Date().toString());

      // Update the observable
      this.loggedIn = true;
      this.logger.next(this.loggedIn);

      this.alert
      .displayAlert(
        'Connection réussite',
        'success'
      );

      // Redirect
      this.router.navigate(['/']);

    },
    err => {

      console.log("Error: ");
      console.log(err);

      // Else display wrong credentials
      this.alert
      .displayAlert(
        'Bad credentials!',
        'danger'
      );
    });
  }

  logout(): any {

    localStorage.removeItem(ConfigService.currentUser);

    this.loggedIn = false;
    this.logger.next(this.loggedIn);

    this.alert
    .hideAlert();

    this.router.navigate(['/login']);
  }

  isLoggedIn(): Observable<boolean> {
    return this.logger.asObservable();
  }

  isLoggedInAt(): boolean {
    return this.loggedIn;
  }

}
