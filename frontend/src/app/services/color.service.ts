/**
*  Copyright (C) 2017
*
*   Kaan K.
*  Artur B.
*
*  MIT License
*/

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ColorService {

//  API = 'https://localhost:8000';
  API = 'https://46.38.255.109:8000';

  constructor(private http: Http) { }

  getColors() {
    return this.http.get(`${this.API}/colors/all`)
      .map(res => res.json());
  }

}
