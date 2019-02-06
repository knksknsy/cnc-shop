/**
*  Copyright (C) 2017
*
*  Kaan K.
*
*  MIT License
*/

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs//Observable';
import { IOrder } from '../interfaces/order';

@Injectable()
export class OrderHistoryResolverService implements Resolve<IOrder> {

  API = 'https://localhost:8000';

  constructor(private http: Http) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IOrder> {
    return this.http.get(`${this.API}/order/history`, { withCredentials: true })
      .map((res: Response) => {
        return res.json();
      });
  }

}
