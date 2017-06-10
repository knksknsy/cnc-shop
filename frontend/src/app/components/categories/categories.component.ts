/**
*  Copyright (C) 2017
*
*   Kaan K.
*
*  MIT License
*/

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
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
