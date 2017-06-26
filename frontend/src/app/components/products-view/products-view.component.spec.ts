/**
*  Copyright (C) 2017
*
*  Eli K.
*
*  MIT License
*/

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

//Import the Component to be tested
import { ProductsViewComponent } from './products-view.component';

//Import the RouterTestingModule
import { RouterTestingModule } from '@angular/router/testing' ;

//Import the ng-TranslateModule
import { TranslateModule } from "@ngx-translate/core";

//Import other Components included in the component to be tested
import { CategoriesGridComponent } from "app/components/categories-grid/categories-grid.component";
import { ProductsGridComponent } from "app/components/products-grid/products-grid.component";
import { CategoryCardComponent } from "app/components/category-card/category-card.component";
import { ProductCardComponent } from "app/components/product-card/product-card.component";


describe('ProductsView Component', () => {
  let component: ProductsViewComponent;
  let fixture: ComponentFixture<ProductsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsViewComponent,
                      CategoriesGridComponent, 
                      ProductsGridComponent, 
                      CategoryCardComponent, 
                      ProductCardComponent 
                    ],
      imports: [RouterTestingModule, TranslateModule.forRoot()]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

//Test if the component 'products-view' ist correctly created
  it('should create Component PRODUCTS-VIEW, which includes other Components', () => {
    expect(component).toBeTruthy();
  });

  
});

