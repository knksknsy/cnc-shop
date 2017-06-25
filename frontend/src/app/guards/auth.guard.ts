/**
*  Copyright (C) 2017
*
*   Kaan K.
*
*  MIT License
*/

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthenticationService) { }

  canActivate(route?: ActivatedRouteSnapshot, state?: RouterStateSnapshot): Observable<boolean> {
    return this.authService.isLoggedIn()
      .map((loggedIn) => {
        if (loggedIn) {
          return loggedIn;
        }
        this.router.navigate(['/']);
        return loggedIn;
      });
  }

  canActivateWithoutRedirecting(): Observable<boolean> {
    return this.authService.isLoggedIn()
      .map((loggedIn) => {
        if (loggedIn) {
          return loggedIn;
        }
        return loggedIn;
      })
  }

}
