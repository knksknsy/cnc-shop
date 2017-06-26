/**
*  Copyright (C) 2017
*
*   Artur B.
*
*  MIT License
*/

import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-i18n-button',
  templateUrl: './i18n-button.component.html',
  styleUrls: ['./i18n-button.component.scss']
})
export class I18nButtonComponent implements OnInit {

  constructor(public translate: TranslateService) { }

  translateToEnglish(){
    this.translate.use('en');
  }
  translateToGerman(){
    this.translate.use('de');
  }

  ngOnInit() {
  }

}
