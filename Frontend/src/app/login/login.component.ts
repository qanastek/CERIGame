import { ConfigService } from './../Services/config.service';
import { AuthenticationServiceService } from './../Services/authentication-service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // Login form
  loginForm: FormGroup;

  // Last connection date
  lastConnection: any;

  // Constructor
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthenticationServiceService
  ) {

    // Login form
    this.loginForm = this.formBuilder.group({
      username: '',
      password: ''
    });
  }

  ngOnInit(): void {

    // Get the last connection from the local storage
    this.lastConnection = localStorage.getItem(ConfigService.lastConnection);

    // Check if connected
    if (this.authService.isLoggedInAt) {

      // Redirect
      this.router.navigate(['/']);
    }
  }

  /**
   * Login
   * @param data The form data
   */
  login(data: any): void {

    // Login
    this.authService.login(data.username, data.password);
  }

}
