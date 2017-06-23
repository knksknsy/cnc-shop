/**
*  Copyright (C) 2017
*
*   Kaan K.
*
*  MIT License
*/

import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { ICartItem } from '../interfaces/cart-item';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

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
    let orderData = [];
    let cartValid = true;
    cart.forEach((item) => {
      if (item.quantity > 0) {
        orderData.push(
          { pId: item.product.id, colors: item.colors, quantity: item.quantity }
        );
      } else {
        cartValid = false;
      }
    });
    if (!cartValid) {
      return Observable.throw(new Error('Cart is invalid'));
    } else {
      let body = {
        orders: orderData
      }
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let options = new RequestOptions({ headers: headers, withCredentials: true });
      return this.http.post(`${this.API}/order`, body, options)
        .map((res: Response) => {
          if (res.status === 200) {
            return true;
          }
          return false;
        });
    }
  }

  public orderKey() {
    return this.http.get(`${this.API}/order/key`, { withCredentials: true })
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

  public clearCart() {
    this.removeLocalStorageCart(this.localStorageKey);
    this.setLocalStorageKey();
  }

  // call this method whenever user has logged in or out
  public setLocalStorageKey() {
    this.localStorageKey = this.publicCart;
    this.orderKey()
      .subscribe((res: any) => {
        // server responded with orderId
        if (res.orderId) {
          let publicCart = this.getLocaleStorageCart(this.localStorageKey);
          // localStorage of orderId = 'publicCart' has already been populated with products
          if (publicCart && typeof publicCart === 'object' && publicCart.length > 0) {
            // delete public localStorage
            this.removeLocalStorageCart(this.localStorageKey);
            this.setLocaleStorageCart(res.orderId, publicCart);
          }
          // localStorage of orderId = 'publicCart' is empty
          if (publicCart && typeof publicCart === 'object' && publicCart.length === 0) {
            this.removeLocalStorageCart(this.localStorageKey);
            this.setLocaleStorageCart(res.orderId, []);
          }
          this.localStorageKey = res.orderId;
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
