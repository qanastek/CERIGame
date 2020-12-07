import { ConfigService } from './../../../Services/config.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from './../../../Services/users.service';
import { Component, OnInit } from '@angular/core';
import { faEdit, faCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  // Icons
  faEdit = faEdit;
  faCircle = faCircle;

  // user identifier
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
  ) {

    // Empêche la route de faire du caching
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }

  /**
   * Init
   */
  ngOnInit(): void {

    // Current identifier
    this.id = this.route.snapshot.paramMap.get('id');

    // Current username
    this.currentUsername = localStorage.getItem(ConfigService.currentUsername);

    // Check not empty
    if (this.id) {

      // Fetch the user data
      this.profileInfo();

      // Fetch the user history data
      this.userHistory();

      // Fetch the user challenges data
      this.userChallenges();

    }
    else {
      console.log("No identifier!!!");
    }
  }

  /**
   * Get user information
   */
  async profileInfo(): Promise<void> {

    // Get profile info
    this.users
    .profile(this.id)
    .subscribe((res: any) => {

      // Fill up the user data
      this.user = res;
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

    // Get user history
    this.users
    .history(this.id)
    .subscribe((res: any) => {

      // Fill up the history
      this.history = res;
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

    // Get user challenges
    this.users
    .defis(this.id)
    .subscribe((res: any) => {

      // Fill up the challenges
      this.defis = res;
      return;

    },
    err => {
      console.log("Error: ");
      console.log(err);
    });
  }
}
