/**
*  Copyright (C) 2017
*
*  Eli K.
*
*  MIT License
*/



//Import the async and TestBed test-Utility
import { TestBed, async, inject } from '@angular/core/testing';

//Import the service to be tested
import { ProductsService } from "app/services/products.service";

//Import the HttpModule
import {HttpModule} from '@angular/http';
import { MockProducts } from "app/services/products.data.mock";

//Import a created Moch data



describe('ProductsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductsService],
      imports: [HttpModule]
    });
  });

 //1. Test if the service ' Category.service' is correctly created
  it('should be created', inject([ProductsService], (service: ProductsService) => {
    expect(service).toBeTruthy();
  }));


//2. Test the Response of the API - call
it('schould return ALL PRODUCTS after the API Call', inject ([ProductsService], (service: ProductsService) => {
  return service.getAllProducts().subscribe ( data => {
    expect (data).toEqual (MockProducts);
  })
}))
});


