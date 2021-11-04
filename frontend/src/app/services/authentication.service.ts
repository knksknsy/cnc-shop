/**
*  Copyright (C) 2017
*
*  Kaan K.
*  Artur Bergen  <ab176@hdm-stuttgart.de>
*
*  MIT License
*/

import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {

  API = 'https://localhost:8000';

  constructor(private http: Http) { }

  register(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(`${this.API}/user/register`, user, options)
      .map((res: Response) => {
        if (res.status === 200) {
          return true;
        } else {
          return res.json();
        }
      });
  }

  login(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(`${this.API}/user/login`, user, options)
      .map((res: Response) => {
        if (res.status === 200) {
          return true;
        }
        return false;
      });
  }

  isLoggedIn() {
    return this.http.get(`${this.API}/user/isLoggedIn`, { withCredentials: true })
      .map((res) => {
        return res.json().loggedIn;
      });
  }

  logout() {
    return this.http.get(`${this.API}/user/logout`, { withCredentials: true })
      .map((res: Response) => {
        if (res.status === 200) {
          return true;
        }
        return false;
      })
  }

}
