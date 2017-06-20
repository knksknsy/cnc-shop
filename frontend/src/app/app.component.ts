/**
*  Copyright (C) 2017
*
*   Kaan K.
*   Artur B.
*
*  MIT License
*/

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = `cap'n can`;

  constructor(private router: Router, private translate: TranslateService) {
    translate.setDefaultLang('en');
  }

  searchQuery(query) {
    this.router.navigate(['/search', query.searchQuery]);
  }
}
