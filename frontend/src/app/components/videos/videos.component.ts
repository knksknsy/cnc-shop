/**
*  Copyright (C) 2017
*
*  Eli K.
*
*  MIT License
*/

import { Component, OnInit } from '@angular/core';

import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {

  url: any;
  url1: any;
  video: any = {id: 'bCgGzxXF_Ac'};
  video1:any = {id: 'Pv-Do30-P8A'};
  baseUrl: string = 'https://www.youtube.com/embed/';
  baseUrl1: string = 'https://www.youtube.com/embed/';

  constructor( private sanitizer: DomSanitizer) { 

    this.url = this.sanitizer.bypassSecurityTrustResourceUrl (this.baseUrl + this.video.id);
    this.url1 = this.sanitizer.bypassSecurityTrustResourceUrl (this.baseUrl1 + this.video1.id);
  }

  ngOnInit() {
  }

}
