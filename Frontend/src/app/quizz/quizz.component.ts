import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { QuizzService } from './../Services/quizz/quizz.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.scss']
})
export class QuizzComponent implements OnInit, OnDestroy {

  // Running status
  running = true;

  // The difficulty
  difficulty: any;

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

  // Constructor
  constructor(
    private quizzService: QuizzService,
    private route: ActivatedRoute,
    private router: Router,
  ) {

    // Get the params
    const navigation = this.router.getCurrentNavigation();

    // Get the states
    const state = navigation.extras.state as {
      id: string,
      difficulty: number
    };

    // Save them locally
    this.id = state.id;
    this.difficulty = state.difficulty;
  }

  /**
   * Init
   */
  ngOnInit(): void {

    console.log("------------------------------ " + this.id);

    // If we have the id
    if (this.id) {

      // Fetch the data
      this.quizzService
      .quizzOfTheme(this.id)
      .subscribe((res: any) => {

        // Fill up the questions
        res.forEach(q => {

          // Reponse the response and slice to the correct size
          const questions = q.propositions
                        .filter(item => item !== q.réponse)
                        .slice(0,this.difficulty);

          // Add the response
          questions.push(q.réponse);

          // Shuffle two time
          this.shuffleArray(questions);
          this.shuffleArray(questions);

          console.log(questions);

          // Update the proposals
          q.propositions = questions;

          // Push the responses
          this.questions.push(q);
        });

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
   * When we quit the component
   */
  ngOnDestroy() {

    console.log('quizz destroy');

    // Stop the loop
    this.running = false;
  }

  /**
   * Start the timer
   */
  startTimer(): any {

    // Setup the timer
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

        // Decrease the time
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

        // Reset the timer
        this.timer = this.startTime;

        // Next question
        this.index++;
      }

    }, 1000);
  }

  // Shuffle the array
  shuffleArray(array): any {

    // For each element in reverse
    for (let i = array.length - 1; i > 0; i--) {

      // Get a random index
      const j = Math.floor(Math.random() * (i + 1));

      // Swap the values
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

}
