/**
*  Copyright (C) 2017
*
*   Kaan K.
*
*  MIT License
*/

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { IProduct } from '../../interfaces/product';
import { IColor } from '../../interfaces/color';
import { ICartItem } from '../../interfaces/cart-item';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  public details: IProduct;
  public colors: Array<IColor> = [];
  public cartDisabled: boolean = true;
  public resetSelectedColors: boolean = false;
  public selectedItemColors: Array<IColor> = [];
  // todo: enable setting multiple products to cart
  public itemQuantity: number = 1;
  // public pulse: boolean = true;

  constructor(private route: ActivatedRoute, private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
    this.route.params.forEach(params => {
      window.scrollTo(0, 0);
      // setTimeout(() => {
      //   this.pulse = false;
      // }, 3000);
      this.details = this.route.snapshot.data['details'];
      this.colors = this.route.snapshot.data['colors'];
    });
  }

  selectColor(ev: any) {
    if (ev.selectedColors) {
      this.resetSelectedColors = false;
      this.selectedItemColors = ev.selectedColors;
      if (this.selectedItemColors.length > 0) {
        this.cartDisabled = false;
      }
    } else if (!ev) {
      this.resetSelectedColors = false;
      this.cartDisabled = true;
    }
  }

  addToCart() {
    if (!this.cartDisabled && this.selectedItemColors.length > 0) {
      let cartItem: ICartItem = {
        product: {
          id: this.details.id,
          name: this.details.name,
          image: this.details.image,
          price: this.details.price
        },
        colors: this.selectedItemColors,
        quantity: this.itemQuantity
      };
      // sort color names by length
      cartItem.colors = cartItem.colors.sort((a, b) => {
        return b.name.length - a.name.length || a.name.localeCompare(b.name);
      });
      this.shoppingCartService.addProduct(cartItem);
      this.selectedItemColors = [];
      this.resetSelectedColors = true;
      this.cartDisabled = true;
    }
  }

}
