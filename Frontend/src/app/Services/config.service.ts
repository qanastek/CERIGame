import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }

  static apiUrl = 'http://localhost:3222';
  static currentUser = 'currentUser';
}
