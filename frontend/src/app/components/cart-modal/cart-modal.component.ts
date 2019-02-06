/**
*  Copyright (C) 2017
*
*  Kaan K.
*  Artur B.
*
*  MIT License
*/

import { Component, ViewChild, ViewChildren, Output, EventEmitter } from '@angular/core';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { AuthGuard } from '../../guards/auth.guard';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import { ICartItem } from '../../interfaces/cart-item';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.scss']
})
export class CartModalComponent {
  @Output() openLogin: EventEmitter<any> = new EventEmitter();
  @ViewChild('autoShownModal') public autoShownModal: ModalDirective;
  @ViewChildren('input') inputs;
  public isModalShown: boolean = false;
  public orderActive: boolean = true;
  public orderError: boolean;
  public emptyCart: boolean;
  public totalCost: number = 0;

  constructor(private shoppingCartService: ShoppingCartService, private authGuard: AuthGuard) { }

  public showModal(): void {
    this.isModalShown = true;
  }

  public hideModal(): void {
    this.autoShownModal.hide();
  }

  public onHidden(): void {
    this.orderError = null;
    this.isModalShown = false;
  }

  public onShow(): void {
    this.checkCart();
  }

  checkCart() {
    this.totalCost = 0;
    if (this.shoppingCartService.cart.length === 0) {
      this.emptyCart = true
    } else {
      this.emptyCart = false
      this.shoppingCartService.cart.forEach((item) => {
        this.totalCost += item.quantity * item.product.price;
      });
    }
  }

  removeItem(cartItem: ICartItem) {
    this.shoppingCartService.removeProduct(cartItem);
    this.checkCart();
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
    this.checkCart();
  }

  placeOrder() {
    this.authGuard.canActivateWithoutRedirecting()
      .subscribe((loggedIn) => {
        if (loggedIn) {
          this.shoppingCartService.order(this.shoppingCartService.cart)
            .subscribe((success) => {
              if (success) {
                this.orderError = false;
                this.shoppingCartService.clearCart();
                this.checkCart();
                this.emptyCart = true;
              } else {
                this.orderError = true;
              }
            }
            , (err) => {
              this.orderError = true;
            });
        } else {
          this.hideModal();
          this.openLogin.emit();
        }
      });
  }

}
