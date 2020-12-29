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
  top_scores: any[];

  constructor(
    private users: UsersService,
    private webSocket: WebSocketService,
  ) { }

  ngOnInit(): void {

    // Fetch the top users
    this.fetchTopUsers();

    // Top 10 Medals
    this.webSocket
    .listen('top10')
    .subscribe((data) => {

      console.log("WS --------- Data Top 10");
      console.log(data);

      this.top = data;
    });

    // Top 10 Scores
    this.webSocket
    .listen('top10_score')
    .subscribe((data) => {

      console.log("WS --------- Data Top 10 Scores");
      console.log(data);

      this.top_scores = data;
    });
  }

  /**
   * Get top 10 users by score
   */
  async fetchTopUsers(): Promise<void> {

    // Get top 10 medals
    this.users
    .top()
    .subscribe((res: any) => {

      console.log("--------- Data Top 10");
      console.log(res);

      // Fill up the history
      this.top = res;
      return;

    },
    err => {
      console.log("Error: ");
      console.log(err);
    });

    // Get top 10 scores
    this.users
    .top_scores()
    .subscribe((res: any) => {

      console.log("--------- Data Top 10");
      console.log(res);

      // Fill up the history
      this.top_scores = res;
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
