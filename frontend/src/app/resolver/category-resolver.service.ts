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
import { CategoryService } from '../services/category.service';

@Injectable()
export class CategoryResolverService implements Resolve<any> {

  constructor(private categoryService: CategoryService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.categoryService.getCategories();
  }

}
