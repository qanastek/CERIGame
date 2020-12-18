import { Observable, Subscriber } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './../config.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizzService {

  // Base URL for Quizz
  quizzUrl = `${ConfigService.apiUrl}/quizz`;

  constructor(
    private http: HttpClient,
  ) {  }

  /**
   * Get the available themes
   */
  themes(): any {

    return this.http.get(
      `${this.quizzUrl}/themes`,
      {}
    );
  }

  /**
   * Get the quizz available for this theme
   * @param id Theme identifier
   */
  quizzOfTheme(id: string): any {
    return this.http.get(
      `${this.quizzUrl}/themes/${id}`,
      {}
    );
  }

  /**
   * Add a row to the history
   * @param id_user Username
   * @param niveau_jeu Game level
   * @param nb_reponses_corr Nbr of correct responses
   * @param temps Total time of the game
   * @param score Total score
   */
  addToHistory(
    user: number,
    niveau_jeu: number,
    nb_reponses_corr: number,
    temps: number,
    score: number
  ): any {

    return this.http.post(
      `${this.quizzUrl}/historique`,
      {
        user,
        niveau_jeu,
        nb_reponses_corr,
        temps,
        score
      }
    );
  }

  /**
   * Send a challenge request to the opponent
   * @param res The challenge itself
   */
  sendDefi(res: any): any {

    return this.http.post(
      `${this.quizzUrl}/defis`,
      {
        id_user_defi: res.defi,
        id_user_defiant: res.defiant,
        score_user_defiant: res.score,
        quizz: res.quizz,
      }
    );
  }
}
