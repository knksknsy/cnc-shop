/**
*  Copyright (C) 2017
*
*   Kaan K.
*  Artur B.
*
*  MIT License
*/

import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {

 API = 'https://localhost:8000';
  // API = 'https://46.38.255.109:8000';

  constructor(private http: Http) { }

  register(user) {
    return this.http.post(`${this.API}/register`, user)
      .map((res: Response) => {
        res.json();
      });
  }

  login(user) {
    return this.http.post(`${this.API}/login`, user)
      .map((res: Response) => {
        let user = res.json();
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
      });
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

}
