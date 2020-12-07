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

    // this.testWSVotes();

    this.auth
    .isLoggedIn()
    .subscribe((res: any) => {

      this.loggedIn = res;
    });
  }

  // testWSVotes(): any {
  //   this.webSocket.listen('votes')
  //   // .subscribe(
  //   //   msg => console.log('message received: ' + msg),
  //   //   // Called whenever there is a message from the server
  //   //   err => console.log(err),
  //   //   // Called if WebSocket API signals some kind of error
  //   //   () => console.log('complete')
  //   //   // Called when connection is closed (for whatever reason)
  //   // );
  //   .subscribe((data) => {
  //     // console.log(data);
  //   });
  // }

  toggleMenu(): any {

    this.sidebar
    .toggle();
  }

  logout(): any {

    // Logout
    this.auth.logout();
  }

}
