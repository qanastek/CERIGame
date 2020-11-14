import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { QuizzService } from './../Services/quizz/quizz.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.scss']
})
export class QuizzComponent implements OnInit {

  // Running status
  running = true;

  // Questions list
  questions = [];

  // User responses list
  responses = [];

  // Theme identifier
  id: string;

  // Good response counter
  goodResponses = 0;

  // Game score
  score = 0;

  // Timer
  startTime = 5;
  timer = this.startTime;
  totalTime = 0;

  // Current question index
  index = 0;

  interval: any;

  constructor(
    private quizzService: QuizzService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id');

    console.log("------------------------------ " + this.id);

    if (this.id) {

      // Fetch the data
      this.quizzService
      .quizzOfTheme(this.id)
      .subscribe((res: any) => {

        console.log("------------------- res");
        console.log(res);
        console.log(res[0].propositions);

        // Fill up the questions
        this.questions = res;

        // Start the timer
        this.startTimer();

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

  /**
   * Start the timer
   */
  startTimer(): any {

    this.interval = setInterval(() => {

      /**
       * If the game is stopped
       */
      if(!this.running) {

        // Stop the timer
        clearInterval(this.interval);

        // Reset the timer
        this.timer = this.startTime;

        /**
         * Update the history of the user
         * user, level, correct, time, score
         */
        this.quizzService
        .addToHistory(
          7,
          1,
          this.goodResponses,
          this.totalTime,
          this.score
        )
        .subscribe((res: any) => {
          console.log("addToHistory");
          console.log(res);
        },
        err => {
          console.log("Error: ");
          console.log(err);
        });

        // Stop the timer
        return;

      }
      else if(this.timer > 0) {

        this.timer--;

        console.log("time--");

        // Total time
        this.totalTime++;

      } else {

        // Insert the response in the list
        this.responses.push({
          res: undefined,
          status: false,
        });

        console.log(this.responses);

        // Reset the timer
        this.timer = this.startTime;

        // Next question
        this.index++;
      }

    }, 1000);
  }

}
