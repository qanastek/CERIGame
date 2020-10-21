import { AuthenticationServiceService } from './../../Services/authentication-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private auth: AuthenticationServiceService,
  ) { }

  public loggedIn: any;

  ngOnInit(): void {

    this.auth
    .isLoggedIn()
    .subscribe((res: any) => {

      this.loggedIn = res;
    });
  }

  logout(): any {

    // Logout
    this.auth.logout();
  }

}
