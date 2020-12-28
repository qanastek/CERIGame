import { AlertService } from './../Services/alert.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { QuizzService } from './../Services/quizz/quizz.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.scss']
})
export class ThemesComponent implements OnInit {

  selectedTheme;
  themes = [];

  currentDifficulty = 3;
  difficulties = [1, 2, 3];

  checkoutForm;

  constructor(
    private quizzService: QuizzService,
    private alert: AlertService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  /**
   * Init
   */
  ngOnInit(): void {

    // Setup the form
    this.checkoutForm = this.formBuilder.group({
      difficulty: [null, Validators.required],
      theme: [null, Validators.required]
    });

    // Fetch /Quizz/themes
    this.quizzService
    .themes()
    .subscribe((res: any) => {

      // Map the result array
      this.themes = res.result.map((t: any) => {
        return {
          id: t._id,
          theme: t.thème,
        };
      });

    },
    err => {
      console.log("Error: ");
      console.log(err);
    });
  }

  /**
   * On click for submit
   * @param data Form
   */
  onSubmit(data): any {

    // If the form is valid
    if (this.checkoutForm.valid) {

      // Go to the play screen
      this.playTheme(data.theme, data.difficulty);

    } else {

      // If not full
      this.alert
      .displayAlert(
        'Champs Manquant',
        'danger'
      );

    }

  }

  /**
   * Play a game in this category
   * @param id Identifier of the theme
   */
  playTheme(id: string, difficulty: number): any {

    // Set the params
    const navigationExtras: NavigationExtras = {
      state: {
        id,
        difficulty,
        defi: null
      }
    };

    // Redirect to the route and send the data into it
    this.router.navigate(['/quizz'], navigationExtras);
  }

}
