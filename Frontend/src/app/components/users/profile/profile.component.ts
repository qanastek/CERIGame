import { ConfigService } from './../../../Services/config.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from './../../../Services/users.service';
import { Component, OnInit } from '@angular/core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  faEdit = faEdit;

  // Theme identifier
  id: string;
  currentUsername: string;

  // Edit status
  status = {
    avatar: false,
    humeur: false,
  };

  // User informations
  user: any;
  history: any[];
  defis: any[];

  constructor(
    private users: UsersService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {

    // Current identifier
    this.id = this.route.snapshot.paramMap.get('id');

    // Current username
    this.currentUsername = localStorage.getItem(ConfigService.currentUsername);

    if (this.id) {

      // Fetch the user data
      this.profileInfo();

      console.log("profileInfo");

      // Fetch the user history data
      this.userHistory();

      console.log("userChallenges");

      // Fetch the user challenges data
      this.userChallenges();

      console.log("userChallenges");

    }
    else {
      console.log("No identifier!!!");
    }
  }

  /**
   * Get user information
   */
  async profileInfo(): Promise<void> {

    this.users
    .profile(this.id)
    .subscribe((res: any) => {

      console.log("------------------- res");
      console.log(res);

      // Fill up the user data
      this.user = res;
      console.log("this.user");
      console.log(this.user);
      return;

    },
    err => {
      console.log("Error: ");
      console.log(err);
    });
  }

  /**
   * Get user history
   */
  async userHistory(): Promise<void> {

    this.users
    .history(this.id)
    .subscribe((res: any) => {

      console.log("------------------- res");
      console.log(res);

      // Fill up the history
      this.history = res;
      console.log("this.history");
      console.log(this.history);
      return;

    },
    err => {
      console.log("Error: ");
      console.log(err);
    });
  }

  /**
   * Get user challenge
   */
  async userChallenges(): Promise<void> {

    this.users
    .defis(this.id)
    .subscribe((res: any) => {

      console.log("------------------- res");
      console.log(res);

      // Fill up the challenges
      this.defis = res;
      console.log("this.defis");
      console.log(this.defis);
      return;

    },
    err => {
      console.log("Error: ");
      console.log(err);
    });
  }

  saveHumeur(): void {

    console.log('saveHumeur');

    // Send the data to the server
  }

  saveAvatar(): void {

    console.log('saveAvatar');

    // Send the data to the server
  }

}
