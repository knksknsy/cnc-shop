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
export class CategoryService {

  API = 'https://localhost:8000';

  constructor(private http: Http) { }

  getCategories() {
    return this.http.get(`${this.API}/categories/all`)
      .map(res => res.json());
  }

}
