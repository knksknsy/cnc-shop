/**
*  Copyright (C) 2017
*
*   Kaan K.
*
*  MIT License
*/

import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
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
  @ViewChildren('input') inputs;
  public isModalShown: boolean = false;
  public orderActive: boolean = true;
  public orderError: boolean;
  public emptyCart: boolean;

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

  public onShow(): void {
    if (this.shoppingCartService.cart.length < 1) {
      this.emptyCart = true
    } else {
      this.emptyCart = false
    }
  }

  removeItem(cartItem: ICartItem) {
    this.shoppingCartService.removeProduct(cartItem);
  }

  validate(value: number, index: number, cartItem: ICartItem) {
    let hasError: boolean = false;
    this.inputs.toArray().forEach((element) => {
      let inputValue = element.nativeElement.firstElementChild.value
      if (inputValue === null || inputValue === undefined || inputValue <= 0) {
        hasError = true;
        element.nativeElement.classList.add('has-danger');
      } else {
        element.nativeElement.classList.remove('has-danger');
      }
    });
    if (hasError) {
      this.orderActive = false;
    } else {
      this.orderActive = true;
    }
    cartItem.quantity = value;
    this.shoppingCartService.editProduct(cartItem);
  }

  placeOrder() {
    this.shoppingCartService.order(this.shoppingCartService.cart)
      .subscribe((success) => {
        if (success) {
          this.orderError = false;
          this.shoppingCartService.clearCart();
        } else {
          this.orderError = true;
        }
      });
  }

}
