import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from './../../../Services/users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  // Theme identifier
  id: string;

  // User informations
  user: any;

  constructor(
    private users: UsersService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {

      // Fetch the data
      this.users
      .profile(this.id)
      .subscribe((res: any) => {

        console.log("------------------- res");
        console.log(res);

        // Fill up the questions
        this.user = res;
        console.log(this.user);

      },
      err => {
        console.log("Error: ");
        console.log(err);
      });

    }
    else {
      console.log("No identifier!!!");
    }
  }

  edit(): void {

    console.log('edit');

    // Redirect
    this.router.navigate([`/users/profile/${this.user.identifiant}/edit`]);
  }

}
