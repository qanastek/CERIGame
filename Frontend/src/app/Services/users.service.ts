import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  // Base URL Users
  url = `${ConfigService.apiUrl}/users`;

  // Constructor Injection
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
   * Fetch all the users
   */
  users(): any {
    return this.http.get(
      `${this.url}`,
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

    // Add content body as a JSON Object
    const body = { humeur: humeur };

    // Add the JSON header
    const headers = { 'Content-Type': 'application/json' };

    // URL
    var path = `${this.url}/${id}/humeur`;

    // Send the request
    return this.http.patch(
      path,
      body,
      { headers }
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
   * Fetch the user top 10
   */
  top(): any {
    return this.http.get(
      `${this.url}/top`,
      {}
    );
  }

  /**
   * Fetch the user active challenges
   * @param id The user identifier
   */
  activeDefis(id: string): any {
    return this.http.get(
      `${this.url}/${id}/active_defis`,
      {}
    );
  }

  /**
   * Fetch the user challenges history
   * @param id The user identifier
   */
  defis(id: string): any {
    return this.http.get(
      `${this.url}/${id}/hist_defis`,
      {}
    );
  }

}
