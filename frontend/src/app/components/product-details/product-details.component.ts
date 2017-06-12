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
  details: any = [];
  public pulse: boolean = true;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.forEach(params => {
      window.scrollTo(0,0);
      this.details = this.route.snapshot.data['details'];
      setTimeout(() => {
        this.pulse = false;
      }, 3000);
    });
  }

}
