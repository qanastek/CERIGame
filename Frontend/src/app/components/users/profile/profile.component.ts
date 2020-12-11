import { FormBuilder, Validators } from '@angular/forms';
import { AlertService } from './../../../Services/alert.service';
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
  lastLogin: any;

  // Edit status
  status = {
    avatar: false,
    humeur: false,
  };

  // User informations
  user: any;
  history: any[];
  defis: any[];

  // Edit forms
  formAvatar: any;
  formHumeur: any;

  constructor(
    private users: UsersService,
    private route: ActivatedRoute,
    private router: Router,
    private alert: AlertService,
    private formBuilder: FormBuilder,
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
    this.lastLogin = localStorage.getItem(ConfigService.lastConnection);

    // Check not empty
    if (this.id) {

      // Fetch the user data
      this.profileInfo();

      // Fetch the user history data
      this.userHistory();

      // Fetch the user challenges data
      this.userChallenges();

      // Setup the form
      this.formAvatar = this.formBuilder.group({
        url: [null, Validators.required]
      });
      this.formHumeur = this.formBuilder.group({
        humeur: [null, Validators.required]
      });

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

      // Set avatar
      this.formAvatar
      .controls['url']
      .setValue(this.user.avatar);

      // Set humeur
      this.formHumeur
      .controls['humeur']
      .setValue(this.user.humeur);

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

  updateAvatar(data): any {

    // Toggle button
    this.status.avatar = !this.status.avatar;

    // If opened
    if (this.status.avatar) return;

    console.log("dddd");

    // If the form is valid
    if (this.formAvatar.valid) {

      // send the request
      console.log("send it");

      // Get profile info
      this.users
      .updateAvatar(this.id, data.url)
      .subscribe((res: any) => {

        // If ok edit the local value
        console.log(res);
        this.user.avatar = data.url;

        return;
      },
      err => {
        console.log("Error: ");
        console.log(err);
      });

    } else {

      // If not full
      this.alert
      .displayAlert(
        'Champs Incorrect',
        'danger'
      );

    }

  }

  /**
   * Path request to the express server
   * @param data The new humor
   */
  updateHumeur(data): any {

    // Toggle button
    this.status.humeur = !this.status.humeur;

    // If opened
    if (this.status.humeur) return;

    console.log("dddd");

    // If the form is valid
    if (this.formHumeur.valid) {

      // send the request
      console.log("send it");

      // Get profile info
      this.users
      .updateHumeur(this.id, data.url)
      .subscribe((res: any) => {

        // If ok edit the local value
        console.log(res);
        this.user.humeur = data.humeur;

        return;
      },
      err => {
        console.log("Error: ");
        console.log(err);
      });

    } else {

      // If not full
      this.alert
      .displayAlert(
        'Champs Incorrect',
        'danger'
      );

    }

  }
}
