import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  url = `${ConfigService.apiUrl}/users`;

  constructor(private http: HttpClient) { }

  /**
   * Fetch the list of the last N connected users
   * @param size Max 20 users
   */
  lastUsers(size: number): any {
    return this.http.get(
      `${this.url}/lastUsers/${size}`,
      {}
    );
  }

  /**
   * Fetch the profile of the user
   * @param id The user identifier
   */
  profile(id: string): any {
    return this.http.get(
      `${this.url}/${id}`,
      {}
    );
  }

}
