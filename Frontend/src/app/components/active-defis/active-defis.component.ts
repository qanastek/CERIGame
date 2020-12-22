import { QuizzService } from './../../Services/quizz/quizz.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from './../../Services/users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-active-defis',
  templateUrl: './active-defis.component.html',
  styleUrls: ['./active-defis.component.scss']
})
export class ActiveDefisComponent implements OnInit {

  id: string;

  defis: any[];

  constructor(
    private userService: UsersService,
    private quizzService: QuizzService,
    private route: ActivatedRoute,
    private router: Router,
  ) {

    // Current identifier
    this.id = this.route.snapshot.paramMap.get('id');

    // Fetch the user challenges
    this.userService
    .activeDefis(this.id)
    .subscribe((res: any) => {
      this.defis = res;
      console.log(res);
    });
  }

  ngOnInit(): void {
  }

  // Refuse challenge
  refuse(defi: any): any {

    console.log(defi._id);

    // Delete from local array
    this.defis.splice(
      this.defis.indexOf(defi)  // Index
    );

    // Delete defi from server (db.defi)
    this.quizzService
    .deleteDefis(defi._id)
    .subscribe((res: any) => {
      console.log("Deleted!");
    });
  }

  // Accept challenge
  accept(defi: any): any {

    console.log(defi._id);

    /**
     * TODO: MAKE THIS CODE IN A SERVICE
     */

    // Delete from local array

    // Delete defi from server (db.defi)

    // Play the game in defi mode
    //  Pass the defi data to the game
    //  Reward the winner
    //  Add in fredouil.hist_defi
  }

}
