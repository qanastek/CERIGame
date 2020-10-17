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
    private auth: AuthenticationServiceService
  ) { }

  ngOnInit(): void {
  }

  isLogged(): boolean {
    return this.auth.isLogged();
  }

  logout(): any {

    // Logout
    this.auth.logout();
  }

}
