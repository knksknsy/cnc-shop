/**
*  Copyright (C) 2017
*
*   Kaan K.
*
*  MIT License
*/

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-products-grid',
  templateUrl: './products-grid.component.html',
  styleUrls: ['./products-grid.component.scss']
})
export class ProductsGridComponent {
  private _products: any;
  private _category: string;

  get category(): any {
    return this._category;
  }

  @Input()
  set category(category: any) {
    this._category = category;
  }

  get products(): any {
    return this._products;
  }

  @Input()
  set products(products: any) {
    this._products = products;
  }

  constructor() { }

}
