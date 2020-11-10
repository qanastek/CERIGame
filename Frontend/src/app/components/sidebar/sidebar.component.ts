import { UsersService } from './../../Services/users.service';
import { AuthenticationServiceService } from './../../Services/authentication-service.service';
import { SidebarService } from './../../Services/sidebar.service';
import { Component, OnInit } from '@angular/core';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  status = false;

  constructor(
    private auth: AuthenticationServiceService,
    private sidebar: SidebarService,
    private users: UsersService
  ) { }

  faCircle = faCircle;
  public defaultImg = 'https://i.stack.imgur.com/l60Hf.png';

  public loggedIn: any;
  public lastUsers: any[];

  ngOnInit(): void {

    // Subscribe to the mode
    this.sidebar
    .getStatus()
    .subscribe(status => {
      this.status = status;
    });

    // Subscribe to the logged status
    this.auth
    .isLoggedIn()
    .subscribe((res: any) => {
      this.loggedIn = res;
    });

    // Subscribe to the users list with the priority to the connected users
    this.users
    .lastUsers(10)
    .subscribe((res: any) => {
      this.lastUsers = res;
    });
  }

  toggleMenu(): any {

    this.sidebar
    .toggle();

    console.log(this.status);
  }

}
