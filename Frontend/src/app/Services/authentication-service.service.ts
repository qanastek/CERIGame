import { ConfigService } from './config.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): any {

    return this.http.post(
      `${ConfigService.apiUrl}/login`,
      { "username": username, "motpasse": password }
    )
    .pipe(map(msg => {

      console.log(msg);

      if (msg) {
        window.btoa(msg + '!');
        localStorage.setItem(ConfigService.currentUser, JSON.stringify(msg));
        localStorage.setItem(ConfigService.lastConnection, JSON.stringify(msg));
      }

      return msg;
    }));
  }

  logout(): any {
      localStorage.removeItem(ConfigService.currentUser);
  }
}
