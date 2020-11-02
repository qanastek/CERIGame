import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }

  static apiUrlLocal = 'http://localhost:3222';
  static apiUrlRemote = 'http://pedago.univ-avignon.fr:3223';
  static apiUrl = ConfigService.apiUrlRemote;

  static lastConnection = 'last_connection';
  static currentUser = 'currentUser';
  static currentUsername = 'currentUsername';
}
