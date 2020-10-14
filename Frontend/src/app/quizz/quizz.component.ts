import { map } from 'rxjs/operators';
import { QuizzService } from './../Services/quizz/quizz.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.scss']
})
export class QuizzComponent implements OnInit {

  themes = [];

  constructor(private quizzService: QuizzService) { }

  ngOnInit(): void {

    // /Quizz/themes
    this.quizzService
    .themes()
    .subscribe((res: any) => {

      console.log("--- res");
      this.themes = res.result.map(t => t.thème);
      console.log(this.themes);

    },
    err => {

      console.log("Error: ");
      console.log(err);
    });
  }

}
