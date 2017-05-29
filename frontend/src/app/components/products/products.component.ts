import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{
  // instantiate products to an empty array
  products: any = [];

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productsService.getAllProducts().subscribe(products => {
      this.products = products;
      console.log("products: ", this.products);
    });
  }
}