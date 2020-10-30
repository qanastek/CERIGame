import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-results-quizz',
  templateUrl: './results-quizz.component.html',
  styleUrls: ['./results-quizz.component.scss']
})
export class ResultsQuizzComponent implements OnInit {

  // Questions list
  questions: any;

  // User responses list
  responses: any;

  // Clock
  time: any;

  // Score
  score: any;

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    // this.questions = this.route.snapshot.paramMap.get('questions');
    // this.responses = this.route.snapshot.paramMap.get('responses');
    // this.time = this.route.snapshot.paramMap.get('time');
    // this.score = this.route.snapshot.paramMap.get('score');
  }

}
