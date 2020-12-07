import { AuthenticationServiceService } from './../Services/authentication-service.service';
import { ConfigService } from './../Services/config.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private auth: AuthenticationServiceService
  ) { }

  /**
   * Setup the guard rules
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): any {

      // Si connecter
      if(this.auth.isLoggedInAt()) {
        return true;
      }
      // Sinon
      else {

        // Redirect to the login page
        this.router.navigate(['/login']);
        return false;
      }
  }
}
