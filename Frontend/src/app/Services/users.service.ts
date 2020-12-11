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

  /**
   * Update the user avatar
   * @param id The user identifier
   */
  updateAvatar(id: string, avatar: string): any {
    return this.http.patch(
      `${this.url}/${id}/avatar`,
      { avatar }
    );
  }

  /**
   * Update the user humor
   * @param id The user identifier
   */
  updateHumeur(id: string, humeur: string): any {
    return this.http.patch(
      `${this.url}/${id}/humeur`,
      { humeur }
    );
  }

  /**
   * Fetch the user game history
   * @param id The user identifier
   */
  history(id: string): any {
    console.log(`${this.url}/${id}/history`);
    return this.http.get(
      `${this.url}/${id}/history`,
      {}
    );
  }

  /**
   * Fetch the user challenges history
   * @param id The user identifier
   */
  defis(id: string): any {
    return this.http.get(
      `${this.url}/${id}/defis`,
      {}
    );
  }

}
