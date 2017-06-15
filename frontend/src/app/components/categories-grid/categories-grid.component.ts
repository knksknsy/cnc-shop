/**
*  Copyright (C) 2017
*
*   Kaan K.
*
*  MIT License
*/

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-categories-grid',
  templateUrl: './categories-grid.component.html',
  styleUrls: ['./categories-grid.component.scss']
})
export class CategoriesGridComponent implements OnInit {
  private _categories;

  @Input()
  set categories(categories: any) {
    this._categories = categories;
  }

  get categories(): any {
    return this._categories;
  }

  constructor() { }

  ngOnInit() {
  }

}
