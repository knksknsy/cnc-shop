/**
*  Copyright (C) 2017
*
*   Kaan K.
*
*  MIT License
*/

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.scss']
})
export class SlideshowComponent implements OnInit {
  public carouselInterval: number = 7500;
  public isCarouselPaused: boolean;
  public popularProducts = [];

  constructor(private productsService: ProductsService, private router: Router) { }

  ngOnInit() {
    this.productsService.getPopularProducts()
      .subscribe((next) => {
        this.popularProducts = next;
      });
  }

  pauseCarousel(isOpen) {
    this.isCarouselPaused = isOpen;
    if (isOpen) {
      this.carouselInterval = 0;
    } else {
      this.carouselInterval = 7500;
    }
  }

  openView(id: string) {
    this.router.navigate(['/products/details', id]);
  }

}
