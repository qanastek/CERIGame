import { ConfigService } from './../../../Services/config.service';
import { DefiComponent } from './../../defi/defi.component';
import { Router } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-endgame',
  templateUrl: './endgame.component.html',
  styleUrls: ['./endgame.component.scss']
})
export class EndgameComponent implements OnInit {

  // Total time (bi)
  @Input()  totalTime: any;
  @Output() totalTimeChange = new EventEmitter<any>();

  // Difficulty (uni)
  @Input()  difficulty: any;

  // Score (bi)
  @Input()  score: any;
  @Output() scoreChange = new EventEmitter<any>();

  // Question Array (bi)
  @Input()  questions: any[];
  @Output() questionsChange = new EventEmitter<any[]>();

  // Responses Array (bi)
  @Input()  responses: any[];
  @Output() responsesChange = new EventEmitter<any[]>();

  // Good responses (bi)
  @Input()  goodResponses: any;
  @Output() goodResponsesChange = new EventEmitter<any>();

  defiant: any;

  constructor(
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  // Check if is a response
  isResponse(p: any, q: any): any {
    return (p === q.réponse);
  }

  // Check if is true
  isTrue(i: any, q: any): any {
    return this.responses[i].res === q.réponse;
  }

  // Check if is the player choice
  isPlayerChoice(i: any, p: any): any {
    return this.responses[i].res === p;
  }

  defi(): any {

    // Open the dialog modal
    const dialogRef = this.dialog.open(DefiComponent, {
      data: {
        defiant: this.defiant
      }
    });

    // Wait the interaction
    dialogRef.afterClosed().subscribe(result => {

      console.log(`Dialog result: ${result}`);

      // If validated
      if (result) {

        console.log("Validated!");

        // Fetch the current user id
        var currentUserId = localStorage.getItem(ConfigService.currentUserId);

        console.log({
          "defi": currentUserId,
          "defiant": this.defiant,
          "score": this.score,
          "quizz": this.questions
        });
      }
      // If canceled
      else {
        console.log("Canceled!");
      }

    });
  }

}
