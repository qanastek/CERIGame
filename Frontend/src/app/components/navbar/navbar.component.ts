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
    private quizzService: QuizzService,
    private usersService: UsersService,
    private webSocket: WebSocketService,
    private snackBar: MatSnackBar,
  ) { }

  faBell = faBell;

  public loggedIn: any;

  // wsTest: Observable<any>;
  // private wsTestSub: Subscription;

  ngOnInit(): void {

    // this.wsTest = this.usersService.documents;

    // this.wsTestSub = this.usersService
    // .currentDocument
    // .subscribe(doc => this.currentDoc = doc.id);

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
