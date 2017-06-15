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
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public productCategories = [];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.forEach(params => {
      window.scrollTo(0,0);
      this.productCategories = this.route.snapshot.data['categories'];
    });
  }

}
