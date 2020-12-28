import { QuizzService } from './../../../Services/quizz/quizz.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from './../../../Services/users.service';
import { ConfigService } from './../../../Services/config.service';
import { DefiComponent } from './../../defi/defi.component';
import { Router } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

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

  // Challenge (bi)
  @Input()  defi: any;
  @Output() defiChange = new EventEmitter<any>();

  constructor(
    private router: Router,
    public dialog: MatDialog,
    public quizzService: QuizzService,
    private snackBar: MatSnackBar,
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

  /**
   * Send a challenge request to the opponent
   */
  challenge(): any {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      defiant: ''
    };

    // Open the dialog modal
    const dialogRef = this.dialog.open(DefiComponent, dialogConfig);

    // Wait the interaction
    dialogRef.afterClosed().subscribe(result => {

      console.log(result);
      console.log(`Dialog result: ${result.defiant}`);

      // If validated
      if (result) {

        console.log("Validated!");

        // Fetch the current user id
        var currentUserId = localStorage.getItem(ConfigService.currentUserId);
        var currentUsername = localStorage.getItem(ConfigService.currentUsername);

        // To insert
        const res = {
          "defi": result.defiant,              // Defier
          "username_defiant": currentUsername, // Username Username
          "defiant": Number(currentUserId),    // Defiant ID
          "score": this.score,                 // Score Defiant
          "quizz": this.questions,             // Array Questions
          "difficulty": this.difficulty        // Difficulty
        };

        console.log(res);

        this.quizzService
        .sendDefi(res)
        .subscribe(status => {

          console.log(status);

          this.snackBar.open(
            'Defi envoyer!',
            'Fermer',
            {
              duration: 7000,
              horizontalPosition: 'end',
              verticalPosition: 'bottom',
            }
          );
        });
      }
      // If canceled
      else {
        console.log("Canceled!");
      }

    });
  }

}
