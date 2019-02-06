/**
*  Copyright (C) 2017
*
*  Eli K.
*
*  MIT License
*/



import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-graffiti-turorial',
  templateUrl: './graffiti-turorial.component.html',
  styleUrls: ['./graffiti-turorial.component.scss']
})
export class GraffitiTurorialComponent implements OnInit {

  constructor(private router: Router) { }

   goToTutorial() {
    this.router.navigate(['/graffitiPage' ]);
  }


  ngOnInit() {
  }

}

