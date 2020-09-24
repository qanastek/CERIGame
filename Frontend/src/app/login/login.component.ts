import { AuthenticationServiceService } from './../Services/authentication-service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // Login form
  loginForm: FormGroup;

  // Constructor
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationServiceService
  ) {

    // Login form
    this.loginForm = this.formBuilder.group({
      username: '',
      password: ''
    });
  }

  ngOnInit(): void {
  }

  /**
   * Login
   * @param data The form data
   */
  login(data: any): void {

    console.log(data);

    console.log(data.username);
    console.log(data.password);

    this.authService.login(data.username, data.password).subscribe(res => {
      console.log(res);
    });

    // this.loginForm.reset();
  }

}
