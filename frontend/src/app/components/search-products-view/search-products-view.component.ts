/**
*  Copyright (C) 2017
*
*  Kaan K.
*
*  MIT License
*/

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-products-view',
  templateUrl: './search-products-view.component.html',
  styleUrls: ['./search-products-view.component.scss']
})
export class SearchProductsViewComponent implements OnInit {
  public productCategories;
  public products;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.forEach(params => {
      window.scrollTo(0, 0);
      this.products = this.route.snapshot.data['products'];
      this.productCategories = this.route.snapshot.data['categories'];
    });
  }

}
