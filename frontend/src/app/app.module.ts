/**
*  Copyright (C) 2017
*
*   Kaan K.
*
*  MIT License
*/

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

// ngx-bootstrap Modules
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { CarouselModule } from 'ngx-bootstrap/carousel';

// Modules
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';

import { NavbarComponent } from './components/navbar/navbar.component';
import { MenuComponent } from './components/menu/menu.component';
import { I18nButtonComponent } from './components/i18n-button/i18n-button.component';
import { CartModalComponent } from './components/cart-modal/cart-modal.component';
import { LoginModalComponent } from './components/login-modal/login-modal.component';

import { HomeComponent } from './components/home/home.component';
import { SlideshowComponent } from './components/slideshow/slideshow.component';
import { CategoryCardComponent } from './components/category-card/category-card.component';

import { ProductsViewComponent } from './components/products-view/products-view.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

import { ProfileComponent } from './components/profile/profile.component';

import { AccessoiresComponent } from './components/accessoires/accessoires.component';
import { CapsComponent } from './components/caps/caps.component';
import { ShoppingcartComponent } from './components/shoppingcart/shoppingcart.component';
import { StaticBilderComponent } from './components/static-bilder/static-bilder.component';

// Services
import { ProductsService } from './services/products.service';
import { AuthenticationService } from './services/authentication.service';

// Guards
import { AuthGuard } from './guards/auth.guard';
import { CategoriesComponent } from './components/categories/categories.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsViewComponent,
    LoginModalComponent,
    ProfileComponent,
    AccessoiresComponent,
    CapsComponent,
    HomeComponent,
    NavbarComponent,
    SlideshowComponent,
    ShoppingcartComponent,
    StaticBilderComponent,
    MenuComponent,
    I18nButtonComponent,
    CartModalComponent,
    ProductDetailsComponent,
    CategoryCardComponent,
    ProductsViewComponent,
    CategoriesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    CollapseModule.forRoot(),
    CarouselModule.forRoot(),
    AppRoutingModule
  ],
  providers: [ProductsService, AuthenticationService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }