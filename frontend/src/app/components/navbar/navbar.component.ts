/**
*  Copyright (C) 2017
*
*   Kaan K.
*
*  MIT License
*/

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Output() search: EventEmitter<any> = new EventEmitter<any>();
  public menuCollapsed: boolean = false;

  public searchForm = this.formBuilder.group({
    searchQuery: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder) { }

  onSearch() {
    this.search.emit(this.searchForm.value);
    this.menuCollapsed = false;
  }

  ngOnInit() { }

  public collapsed(event: any): void {
    console.log(event);
  }

  public expanded(event: any): void {
    console.log(event);
  }

  // make body position fixed (no scrolling) when menu is opened
  lockBodyScroll() {
    let body = document.getElementsByTagName('body')[0];
    if (this.menuCollapsed) {
      body.classList.add('stopScrolling');
    } else {
      body.classList.remove('stopScrolling');
    }
  }
}
