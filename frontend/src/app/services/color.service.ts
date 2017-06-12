/**
*  Copyright (C) 2017
*
*   Kaan K.
*
*  MIT License
*/

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ColorService {

  API = 'http://localhost:3000';

  constructor(private http: Http) { }

  getColors() {
    return this.http.get(`${this.API}/colors/all`)
      .map(res => res.json());
  }

}
