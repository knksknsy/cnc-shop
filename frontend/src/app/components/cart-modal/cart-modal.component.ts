/**
*  Copyright (C) 2017
*
*   Kaan K.
*
*  MIT License
*/

import { Component, OnInit, ViewChild } from '@angular/core';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import { ICartItem } from '../../interfaces/cart-item';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.scss']
})
export class CartModalComponent implements OnInit {

  @ViewChild('autoShownModal') public autoShownModal: ModalDirective;
  public isModalShown: boolean = false;

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
  }

  public showModal(): void {
    this.isModalShown = true;
  }

  public hideModal(): void {
    this.autoShownModal.hide();
  }

  public onHidden(): void {
    this.isModalShown = false;
  }

  removeItem(cartItem: ICartItem) {
    this.shoppingCartService.removeProduct(cartItem);
  }

  validate(value: number, cartItem: ICartItem) {
    if (value === null || value <= 0) {
      value = 1;
    }
    cartItem.quantity = value;
    this.shoppingCartService.editProduct(cartItem);
  }

}
