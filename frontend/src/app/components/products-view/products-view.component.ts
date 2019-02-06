/**
*  Copyright (C) 2017
*
*  Kaan K.
*
*  MIT License
*/

import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-products-view',
  templateUrl: './products-view.component.html',
  styleUrls: ['./products-view.component.scss']
})
export class ProductsViewComponent implements OnInit {
  public productCategories;
  public products;
  public category: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.forEach(params => {
      window.scrollTo(0,0);
      this.products = this.route.snapshot.data['products'];
      this.productCategories = this.route.snapshot.data['categories'];
      this.category = params['category'];
    });
  }

}
