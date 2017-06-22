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
import { ICategory } from '../interfaces/category';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class CategoryService {

 API = 'https://localhost:8000';
  // API = 'https://46.38.255.109:8000';

  constructor(private http: Http) { }

  getCategories(): Observable<Array<ICategory>> {
    return this.http.get(`${this.API}/categories/all`)
      .map(res => res.json());
  }

}
