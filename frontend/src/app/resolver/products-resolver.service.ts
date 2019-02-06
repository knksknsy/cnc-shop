/**
*  Copyright (C) 2017
*
*  Kaan K.
*
*  MIT License
*/

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { Observable } from 'rxjs//Observable';

@Injectable()
export class ProductsResolverService implements Resolve<any> {

  constructor(private productsService: ProductsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.productsService.getProductsByCategory(route.params.category);
  }

}
