import { MatSnackBar } from '@angular/material/snack-bar';
import { WebSocketService } from './../../Services/web-socket.service';
import { ConfigService } from './../../Services/config.service';
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
  currentUserId: any;

  constructor(
    private auth: AuthenticationServiceService,
    private sidebar: SidebarService,
    private users: UsersService,
    private webSocket: WebSocketService,
    private snackBar: MatSnackBar,
  ) { }

  faCircle = faCircle;
  // Default image
  public defaultImg = 'https://i.stack.imgur.com/l60Hf.png';

  public loggedIn: any;
  public lastUsers: any[];

  ngOnInit(): void {

    // Fetch the user id
    this.currentUserId = localStorage.getItem(ConfigService.currentUserId);

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

    // Follow the connected users
    this.webSocket
    .listen('connected')
    .subscribe((data) => {
      console.log("Data connected");
      console.log(data);
      this.lastUsers = data;
    });
  }

  /**
   * Toggle the side menu
   */
  toggleMenu(): any {

    this.sidebar
    .toggle();

    console.log(this.status);
  }

}
