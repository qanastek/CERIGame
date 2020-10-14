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
  }

  /**
   * Login
   * @param data The form data
   */
  login(data: any): void {

    console.log(data);

    console.log(data.username);
    console.log(data.password);

    // Login
    this.authService.login(data.username, data.password)
    .subscribe((res: any) => {

      console.log("--- res");
      console.log(res);

      // Check if 200
      localStorage.setItem(ConfigService.currentUser, res.session_id);
      localStorage.setItem(ConfigService.lastConnection, new Date().toString());
      // Redirect
      this.router.navigate(['/']);

      // Else display wrong credentials

    },
    err => {

      console.log("Error: ");
      console.log(err);

      alert("Bad credentials!");
    });

    // this.loginForm.reset();
  }

}
