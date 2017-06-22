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
import { IColor } from '../interfaces/color';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ColorService {

 API = 'https://localhost:8000';
  // API = 'https://46.38.255.109:8000';

  constructor(private http: Http) { }

  getColors(): Observable<Array<IColor>> {
    return this.http.get(`${this.API}/colors/all`)
      .map(res => res.json());
  }

}
