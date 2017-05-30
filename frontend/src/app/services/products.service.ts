import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductsService {

  API = 'http://localhost:3000';
//  API = 'http://46.38.255.109:3000';

  constructor(private http: Http) { }

  // Get all products from the API
  getAllProducts() {
    return this.http.get(`${this.API}/products`)
      .map(res => res.json());
  }
}
