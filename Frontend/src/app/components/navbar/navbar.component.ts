import { ConfigService } from './../../Services/config.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastChallengeComponent } from './../toast-challenge/toast-challenge.component';
import { WebSocketService } from './../../Services/web-socket.service';
import { UsersService } from './../../Services/users.service';
import { QuizzService } from './../../Services/quizz/quizz.service';
import { Observable, Subscription } from 'rxjs';
import { SidebarService } from './../../Services/sidebar.service';
import { SidebarComponent } from './../sidebar/sidebar.component';
import { AuthenticationServiceService } from './../../Services/authentication-service.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
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
    private quizzService: QuizzService,
    private usersService: UsersService,
    private webSocket: WebSocketService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) { }

  faBell = faBell;

  public loggedIn: any;

  currentUserId: any;

  ngOnInit(): void {

    // Fetch the user id
    this.currentUserId = localStorage.getItem(ConfigService.currentUserId);

    this.testWSVotes();

    this.auth
    .isLoggedIn()
    .subscribe((res: any) => {

      this.loggedIn = res;
    });
  }

  testWSVotes(): any {

    this.webSocket
    .listen('hello')
    .subscribe((data) => {

      console.log("Data Test");
      console.log(data);
    });

    // When somebody login
    this.webSocket
    .listen('login')
    .subscribe((data) => {

      this.snackBar.open(
        `${data} was connected.`,
        'close',
        {
          duration: 2 * 1000,
          horizontalPosition: 'end',
          verticalPosition: 'bottom',
        }
      );
    });

    // When somebody logout
    this.webSocket
    .listen('logout')
    .subscribe((data) => {

      this.snackBar.open(
        `${data} was deconnected.`,
        'close',
        {
          duration: 2 * 1000,
          horizontalPosition: 'end',
          verticalPosition: 'bottom',
        }
      );
    });

    const userId = localStorage.getItem(ConfigService.currentUserId);

    console.log("------------ Listen to the websocket from");
    console.log(userId);

    // Follow a channel named like my username
    this.webSocket
    .listen(`defi_${userId}`)
    .subscribe((data) => {

      console.log("------------ Defi");
      console.log(data);

      let snackBarRef = this.snackBar.open(
        `Invité à un défi par ${data.identifiant_user_defiant}`,
        'Accepter',
        {
          duration: 7000,
          horizontalPosition: 'end',
          verticalPosition: 'bottom',
        }
      );

      // When the user click on the buttons
      snackBarRef.afterDismissed().subscribe(info => {

        // If dismissed
        if (info.dismissedByAction === true) {

          console.log("Accepted!");
          console.log(data._id);

          // Play the game in defi mode and set the params
          const navigationExtras: NavigationExtras = {
            state: {
              id: null,
              difficulty: 0,
              defi: data
            }
          };

          // Pass the defi data to the game and play the game in defi mode
          this.router.navigate(['/quizz'], navigationExtras);
        }
        else {
          console.log("Refused!");
        }

      });

    });

    // /**
    //  * Listen to the challenge requests
    //  */
    // this.webSocket
    // .listen('challenges')
    // .subscribe((data) => {

    //   // Simple message with an action.
    //   let snackBarRef = this.snackBar.openFromComponent(
    //     ToastChallengeComponent,
    //     {
    //       duration: 7000,
    //       data: {
    //         player: 'Zihao Zheng'
    //       },
    //       horizontalPosition: 'end',
    //       verticalPosition: 'bottom',
    //     }
    //   );

    //   // When the user click on the buttons
    //   snackBarRef.afterDismissed().subscribe(info => {

    //     // If dismissed
    //     if (info.dismissedByAction === true) {
    //       console.log("dismissed");
    //     }
    //     else {
    //       console.log("not dismissed");
    //     }
    //   });

    // });

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
