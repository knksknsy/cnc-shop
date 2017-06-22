/**
*  Copyright (C) 2017
*
*   Kaan K.
*
*  MIT License
*/

import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { ICartItem } from '../interfaces/cart-item';

@Injectable()
export class ShoppingCartService {
  API = 'https://localhost:8000';
  public cart: Array<ICartItem> = [];
  private itemId: number;
  private publicCart: string = 'publicCart';
  private localStorageKey: string;

  constructor(private http: Http) {
    this.setLocalStorageKey();
  }

  public order(cart: Array<ICartItem>) {
    return this.http.post(`${this.API}/order`, cart)
      .map((res: Response) => res.json());
  }

  public orderKey() {
    return this.http.get(`${this.API}/order/key`)
      .map((res: Response) => res.json());
  }

  public addProduct(cartItem: ICartItem) {
    this.addLocalStorageItem(this.localStorageKey, cartItem);
  }

  public editProduct(cartItem: ICartItem) {
    this.editLocalStorageItem(this.localStorageKey, cartItem);
  }

  public removeProduct(cartItem: ICartItem) {
    this.removeLocalStorageItem(this.localStorageKey, cartItem);
  }

  // call this method whenever user has logged in or out
  public setLocalStorageKey() {
    this.localStorageKey = this.publicCart;
    this.orderKey()
      .subscribe((res: any) => {
        // server responded with key
        if (res.id) {
          let publicCart = this.getLocaleStorageCart(this.localStorageKey);
          // localStorage of key = 'publicCart' has already been populated with products
          if (publicCart && typeof publicCart === 'object' && publicCart.length > 0) {
            // delete public localStorage
            this.removeLocalStorageCart(this.localStorageKey);
            this.setLocaleStorageCart(res.key, publicCart);
          }
          // localStorage of key = 'publicCart' is empty
          if (publicCart && typeof publicCart === 'object' && publicCart.length === 0) {
            this.removeLocalStorageCart(this.localStorageKey);
            this.setLocaleStorageCart(res.key, []);
          }
          this.localStorageKey = res.key;
        }
        this.initLocalStorage(this.localStorageKey);
      });
  }

  private initLocalStorage(key: string) {
    let cart = this.getLocaleStorageCart(key);
    if (cart && typeof cart === 'object' && cart.length > 0) {
      this.setLocaleStorageCart(key, cart);
    }
    if (!cart) {
      this.setLocaleStorageCart(key, []);
    }
  }

  private getLocaleStorageCart(key: string): Array<ICartItem> {
    return JSON.parse(localStorage.getItem(key));
  }

  public setLocaleStorageCart(key: string, cart: Array<ICartItem>) {
    let existingCart = this.getLocaleStorageCart(key);
    // check if localStorage with same key already exists
    if (existingCart && typeof existingCart === 'object') {
      this.removeLocalStorageCart(key);
      this.itemId = cart.length ? cart.length : 0;
    }
    localStorage.setItem(key, JSON.stringify(cart));
    this.cart = cart;
  }

  private removeLocalStorageCart(key: string) {
    localStorage.removeItem(key);
    this.itemId = 0;
    this.cart = [];
  }

  private addLocalStorageItem(key: string, cartItem: ICartItem) {
    let cart: Array<ICartItem> = this.getLocaleStorageCart(key);
    cartItem.id = `${cartItem.product.id}-${++this.itemId}`;
    cart.push(cartItem);
    this.setLocaleStorageCart(key, cart);
  }

  private editLocalStorageItem(key: string, cartItem: ICartItem) {
    let cart: Array<ICartItem> = this.getLocaleStorageCart(key);
    let itemIndex = cart.findIndex((item) => {
      return cartItem.id === item.id;
    });
    if (itemIndex > -1) {
      cart[itemIndex] = cartItem;
    }
    this.setLocaleStorageCart(key, cart);
  }

  private removeLocalStorageItem(key: string, cartItem: ICartItem) {
    let cart: Array<ICartItem> = this.getLocaleStorageCart(key);
    let itemIndex = cart.findIndex((item) => {
      return cartItem.id === item.id;
    });
    if (itemIndex > -1) {
      cart.splice(itemIndex, 1);
    }
    this.setLocaleStorageCart(key, cart);
  }

}
