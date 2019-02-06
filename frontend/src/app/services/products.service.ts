/**
*  Copyright (C) 2017
*
*  Kaan K.
*  Artur B.
*
*  MIT License
*/

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { IProduct } from '../interfaces/product';

@Injectable()
export class ProductsService {

  API = 'https://localhost:8000';

  constructor(private http: Http) { }

  getAllProducts(): Observable<Array<IProduct>> {
    return this.http.get(`${this.API}/products/all`)
      .map(res => res.json());
  }

  getProductDetails(id: string): Observable<IProduct> {
    return this.http.get(`${this.API}/products/details/` + id)
      .map(res => res.json());
  }

  getProductsByCategory(category: string): Observable<Array<IProduct>> {
    return this.http.get(`${this.API}/products/category/` + category)
      .map(res => res.json());
  }

  getPopularProducts(): Observable<Array<IProduct>> {
    return this.http.get(`${this.API}/products/popular`)
      .map(res => res.json());
  }

  searchProducts(query: string): Observable<Array<IProduct>> {
    return this.http.get(`${this.API}/products/search/` + query)
      .map(res => res.json());
  }

}
