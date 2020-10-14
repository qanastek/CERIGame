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

  // Questions list
  questions = [];

  // User responses list
  responses = [];

  // Theme identifier
  id: string;

  // Current question index
  index = 0;

  // Good response counter
  goodResponses = 0;

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
        this.questions = res;
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

      // Insert the response in the list
      this.responses.push({
        res: proposition,
        status: true,
      });

    } else {

      // Insert the response in the list
      this.responses.push({
        res: proposition,
        status: false,
      });

      console.log("Faux!");
    }

    if (this.index >= (this.questions.length - 1)) {

      console.log("Finish " + this.index);

      // Redirect to the route and send the data into it
      this.router.navigate(['/quizz/results']);
    }

    // Increment responses counter
    this.index++;
  }

}
