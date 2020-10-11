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
      { username, "motpasse": password }
    );
  }

  logout(): any {
      localStorage.removeItem(ConfigService.currentUser);
  }
}
