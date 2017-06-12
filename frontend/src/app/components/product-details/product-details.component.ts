/**
*  Copyright (C) 2017
*
*   Kaan K.
*
*  MIT License
*/

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  public details: any = [];
  public colors: any = [];
  public pulse: boolean = true;
  public cartDisabled: boolean = true;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.forEach(params => {
      window.scrollTo(0,0);
      setTimeout(() => {
        this.pulse = false;
      }, 3000);
      this.details = this.route.snapshot.data['details'];
      this.colors = this.route.snapshot.data['colors'];
    });
  }

  selectColor(ev: any) {
    if (ev.selectedColors) {
      this.cartDisabled = false;
    } else if (!ev) {
      this.cartDisabled = true;
    }
  }

  addToCart() {
    console.log('added to cart');
  }

}
