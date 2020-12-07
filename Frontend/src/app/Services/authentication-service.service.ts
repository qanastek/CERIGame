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
  ) {  }

  /**
   * Login request
   * @param username Username
   * @param password Password
   */
  login(username: string, password: string): any {

    // Send a POST to /login
    return this.http.post(
      `${ConfigService.apiUrl}/login`,
      { username, "motpasse": password }
    )
    .subscribe((res: any) => {

      // Set local storage
      localStorage.setItem(ConfigService.currentUser, res.session_id);
      localStorage.setItem(ConfigService.currentUsername, username);
      localStorage.setItem(ConfigService.currentUserId, res.userId);
      localStorage.setItem(ConfigService.lastConnection, new Date().toString());

      // Update the observable
      this.loggedIn = true;
      this.logger.next(this.loggedIn);

      // Display success message
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

  /**
   * Logout
   */
  logout(): any {

    // Clear current user info
    localStorage.removeItem(ConfigService.currentUser);
    localStorage.removeItem(ConfigService.currentUserId);
    const username = localStorage.getItem(ConfigService.currentUsername);

    // Update login status
    this.loggedIn = false;
    this.logger.next(this.loggedIn);

    // Hide the alert modal
    this.alert
    .hideAlert();

    // Send the logout requesst
    return this.http.post(
      `${ConfigService.apiUrl}/logout`,
      { username }
    )
    .subscribe((res: any) => {

      // Redirect to the login page
      this.router.navigate(['/login']);
    });

  }

  /**
   * Return the login status as a observable
   */
  isLoggedIn(): Observable<boolean> {
    return this.logger.asObservable();
  }

  /**
   * Return the loggin status as a boolean
   */
  isLoggedInAt(): boolean {

    // Get the username
    const id = localStorage.getItem(ConfigService.currentUser);

    // Check empty
    if(id) {
      this.loggedIn = true;
      this.logger.next(this.loggedIn);
    }

    // Return the status
    return this.loggedIn;
  }

}
