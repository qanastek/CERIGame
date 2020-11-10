import { SidebarService } from './../../Services/sidebar.service';
import { SidebarComponent } from './../sidebar/sidebar.component';
import { AuthenticationServiceService } from './../../Services/authentication-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faBell } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private auth: AuthenticationServiceService,
    private sidebar: SidebarService,
  ) { }

  faBell = faBell;

  public loggedIn: any;

  ngOnInit(): void {

    this.auth
    .isLoggedIn()
    .subscribe((res: any) => {

      this.loggedIn = res;
    });
  }

  toggleMenu(): any {

    this.sidebar
    .toggle();
  }

  logout(): any {

    // Logout
    this.auth.logout();
  }

}
