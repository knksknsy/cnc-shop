/**
*  Copyright (C) 2017
*
*   Kaan K.
*
*  MIT License
*/

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = `Cap'n Can`;

  constructor(private router: Router) { }

  searchQuery(query) {
    this.router.navigate(['/search', query.searchQuery]);
  }
}
