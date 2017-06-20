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
export class ProductsService {

 API = 'https://localhost:8000';
  // API = 'https://46.38.255.109:8000';

  constructor(private http: Http) { }

  getAllProducts() {
    return this.http.get(`${this.API}/products/all`)
      .map(res => res.json());
  }

  getProductDetails(id: string) {
    return this.http.get(`${this.API}/products/details/` + id)
      .map(res => res.json());
  }

  getProductsByCategory(category: string) {
    return this.http.get(`${this.API}/products/category/` + category)
      .map(res => res.json());
  }

  getPopularProducts() {
    return this.http.get(`${this.API}/products/popular`)
      .map(res => res.json());
  }

}
