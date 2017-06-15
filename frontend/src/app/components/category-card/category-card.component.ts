/**
*  Copyright (C) 2017
*
*   Kaan K.
*
*  MIT License
*/

import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss']
})
export class CategoryCardComponent {
  private _data: any;

  constructor(private router: Router) { }

  get data(): any {
    return this._data;
  }

  @Input()
  set data(data: any) {
    this._data = data;
  }

  openCategory() {
    this.router.navigate(['/products/category', this.data.name]);
  }

}
