/**
*  Copyright (C) 2017
*
*  Kaan K.
*
*  MIT License
*/

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs//Observable';
import { ProductsService } from '../services/products.service';

@Injectable()
export class SearchProductsResolverService implements Resolve<any> {

  constructor(private productsService: ProductsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.productsService.searchProducts(route.params.query);
  }

}
