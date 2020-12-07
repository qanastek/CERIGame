import { Router } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit, OnDestroy {

  @Input()  startTime: any;
  @Output() startTimeChange = new EventEmitter<any>();

  @Input()  difficulty: any;

  @Input()  timer: any;
  @Output() timerChange = new EventEmitter<any>();

  @Input()  totalTime: any;
  @Output() totalTimeChange = new EventEmitter<any>();

  @Input()  score: any;
  @Output() scoreChange = new EventEmitter<any>();

  @Input()  index = 0;
  @Output() indexChange = new EventEmitter<any>();

  @Input()  questions: any[];
  @Output() questionsChange = new EventEmitter<any[]>();

  @Input()  goodResponses: any;
  @Output() goodResponsesChange = new EventEmitter<any>();

  @Input()  responses: any[];
  @Output() responsesChange = new EventEmitter<any[]>();

  @Input()  running: any;
  @Output() runningChange = new EventEmitter<any>();

  @Input()  interval: any;
  @Output() intervalChange = new EventEmitter<any>();

  levelScore = 100;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    console.log('play destroy');
  }

  /**
   * Select a response
   * @param id The response identifier
   */
  select(question: string, proposition: string): any {

    // Select a response
    console.log(question);
    console.log(proposition);

    if(question["réponse"] === proposition) {

      console.log("Juste!");

      // Increment the good responses counter
      this.goodResponses++;
      this.goodResponsesChange.emit(this.goodResponses);

      // Insert the response in the list
      this.responses.push({
        res: proposition,
        status: true,
      });
      this.responsesChange.emit(this.responses);

      // Get level duration
      const levelTime = this.startTime - this.timer;

      // Update score
      // Multiply the levelScore by the difficulty
      // levelScore * difficulty => 100 * 3 = 300
      this.score += ((this.levelScore * this.difficulty) / (levelTime === 0 ? 1 : levelTime));
      this.scoreChange.emit(this.score);

    } else {

      // Insert the response in the list
      this.responses.push({
        res: proposition,
        status: false,
      });
      this.responsesChange.emit(this.responses);

      console.log("Faux!");
    }

    /**
     * When we finish the last quizz
     */
    if (this.index >= (this.questions.length - 1)) {

      console.log("Finish " + this.index);

      // Stop backgrounds tasks
      this.runningChange.emit(false);
    }

    // Increment responses counter
    this.index++;
    this.indexChange.emit(this.index);

    // Reset the timer
    this.timerChange.emit(this.startTime);
  }

}
