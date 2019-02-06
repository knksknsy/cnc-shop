/**
*  Copyright (C) 2017
*
*  Kaan K.
*
*  MIT License
*/

import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  private _product: any;

  constructor(private router: Router) { }

  get product(): any {
    return this._product;
  }

  @Input()
  set product(product: any) {
    this._product = product;
  }

  openDetails() {
    this.router.navigate(['/products/details', this.product.id]);
  }

}
