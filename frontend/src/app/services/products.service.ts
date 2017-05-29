import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductsService {

  API = 'https://192.168.99.1:3000';

  constructor(private http: Http) { }

  // Get all products from the API
  getAllProducts() {
    return this.http.get(`${this.API}/products`)
      .map(res => res.json());
  }
}