/**
*  Copyright (C) 2017
*
*   Kaan K.
*  Valdet D. <vd021@hdm-stuttgart.de>
*
*  MIT License
*/

import { Component, Input } from '@angular/core';
// impert IProducts hier
import { IProduct } from '../../interfaces/product';

@Component({
  selector: 'app-products-grid',
  templateUrl: './products-grid.component.html',
  styleUrls: ['./products-grid.component.scss']
})
export class ProductsGridComponent {
  private _products: any;
  private _category: string;

  get category(): any {
    return this._category;
  }

  @Input()
  set category(category: any) {
    this._category = category;
  }

  get products(): any {
    return this._products;
  }

  @Input()
  set products(products: any) {
    this._products = products;
  }

// Sort by name A-Z
sortTypeNameAZ(sort:string){
if (sort==='name') {
  this.products= this.products.sort(this.sortByProductNameAZ);
  console.log(this.products);
}

}

// Sort by name Z-A
sortTypeNameZA(sort:string){
if (sort==='name') {
  this.products= this.products.sort(this.sortByProductNameZA);
  console.log(this.products);
}

}

// Sort price ascending
sortPriceAscending(sort:number){
this.products= this.products.sort(this.sortByProductPriceAscending);


}


// Sort price descending
sortPriceDescending(sort:number){
this.products= this.products.sort(this.sortByProductPriceDescending);

}


// Sort by name A-Z
sortByProductNameAZ(n1:IProduct,n2:IProduct){
  if (n1.name > n2.name) return 1
  else if (n1.name === n2.name) return 0
  else return -1
    
}

// Sort by name A-Z
sortByProductNameZA(n1:IProduct,n2:IProduct){
  if (n1.name < n2.name) return 1
  else if (n1.name === n2.name) return 0
  else return -1
    
}

// Sort by price Ascending
sortByProductPriceAscending(p1:IProduct,p2:IProduct){
return (p1.price) - (p2.price);
    
}


// Sort by price Descending
sortByProductPriceDescending(p1:IProduct,p2:IProduct){
return (p2.price) - (p1.price);
    
}

  constructor() { }

}
