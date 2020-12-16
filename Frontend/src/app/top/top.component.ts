import { WebSocketService } from './../Services/web-socket.service';
import { UsersService } from './../Services/users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss']
})
export class TopComponent implements OnInit {

  top: any[];

  constructor(
    private users: UsersService,
    private webSocket: WebSocketService,
  ) { }

  ngOnInit(): void {

    // Fetch the top users
    this.fetchTopUsers();

    // Top 10
    this.webSocket
    .listen('top10')
    .subscribe((data) => {

      console.log("Data Top 10");
      console.log(data);
      this.top = data;
    });
  }

  /**
   * Get top 10 users by score
   */
  async fetchTopUsers(): Promise<void> {

    // Get user history
    this.users
    .top()
    .subscribe((res: any) => {

      // Fill up the history
      this.top = res;
      return;

    },
    err => {
      console.log("Error: ");
      console.log(err);
    });
  }

  getMedal(index: number) {

    switch (index) {
      case 0:
        return '/assets/images/top_1.png';
      case 1:
        return '/assets/images/top_2.png';
      case 2:
        return '/assets/images/top_3.png';
      default:
        return '';
    }

  }

}
