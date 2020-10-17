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

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(this.auth.isLogged()) {

        console.log("Auth guard true");
        return true;
      }
      else {

        console.log("Auth guard false");

        // Redirect
        this.router.navigate(['/login']);
        return false;
      }
  }
}
