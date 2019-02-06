/**
*  Copyright (C) 2017
*
*  Kaan K.
*
*  MIT License
*/

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ColorService } from '../services/color.service';
import { Observable } from 'rxjs//Observable';

@Injectable()
export class ColorsResolverService implements Resolve<any> {

  constructor(private colorService: ColorService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.colorService.getColors();
  }
}
