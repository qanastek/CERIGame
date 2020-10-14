import { HttpClient } from '@angular/common/http';
import { ConfigService } from './../config.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizzService {

  quizzUrl = `${ConfigService.apiUrl}/quizz`;

  constructor(private http: HttpClient) { }

  themes(): any {

    return this.http.post(
      `${this.quizzUrl}/themes`,
      {}
    );
  }
}
