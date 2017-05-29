import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {

  constructor(private http: Http) { }

  register(user) {
    return this.http.post('/api/register', user)
      .map((res: Response) => {
        res.json();
      });
  }

  login(user) {
    return this.http.post('/api/login', user)
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
