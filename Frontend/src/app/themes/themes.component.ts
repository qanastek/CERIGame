import { Router } from '@angular/router';
import { QuizzService } from './../Services/quizz/quizz.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.scss']
})
export class ThemesComponent implements OnInit {

  themes = [];

  constructor(
    private quizzService: QuizzService,
    private router: Router,
  ) { }

  ngOnInit(): void {

    // /Quizz/themes
    this.quizzService
    .themes()
    .subscribe((res: any) => {

      this.themes = res.result.map((t: any) => {
        return {
          id: t._id,
          theme: t.thème,
        };
      });

      console.log("res.themes");
      console.log(this.themes);

    },
    err => {

      console.log("Error: ");
      console.log(err);
    });
  }

  /**
   * Play a game in this category
   * @param id Identifier of the theme
   */
  playTheme(id: string): any {

    // Redirect to the route and send the data into it
    this.router.navigate(['/quizz', id]);

  }

}
