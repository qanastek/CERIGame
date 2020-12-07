import { Router } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-endgame',
  templateUrl: './endgame.component.html',
  styleUrls: ['./endgame.component.scss']
})
export class EndgameComponent implements OnInit {

  @Input()  totalTime: any;
  @Output() totalTimeChange = new EventEmitter<any>();

  @Input()  difficulty: any;

  @Input()  score: any;
  @Output() scoreChange = new EventEmitter<any>();

  @Input()  questions: any[];
  @Output() questionsChange = new EventEmitter<any[]>();

  @Input()  responses: any[];
  @Output() responsesChange = new EventEmitter<any[]>();

  @Input()  goodResponses: any;
  @Output() goodResponsesChange = new EventEmitter<any>();

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  isResponse(p: any, q: any): any {
    return (p === q.réponse);
  }

  isTrue(i: any, q: any): any {
    return this.responses[i].res === q.réponse;
  }

  isPlayerChoice(i: any, p: any): any {
    return this.responses[i].res === p;
  }

}
