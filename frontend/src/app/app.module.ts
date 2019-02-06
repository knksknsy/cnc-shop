/**
*  Copyright (C) 2017
*
*  Kaan K.
*  Artur B.
*  Eli K.
*
*  MIT License
*/

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

// ngx-bootstrap Modules
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

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
import { CategoriesGridComponent } from './components/categories-grid/categories-grid.component';
import { CategoryCardComponent } from './components/category-card/category-card.component';

import { ProductsViewComponent } from './components/products-view/products-view.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ColorDropdownComponent } from './components/color-dropdown/color-dropdown.component';
import { ProductsGridComponent } from './components/products-grid/products-grid.component';
import { ProductCardComponent } from './components/product-card/product-card.component';

import { OrderHistoryComponent } from './components/order-history/order-history.component';

import { VideosComponent } from './components/videos/videos.component';
import { FooterComponent } from './components/footer/footer.component';

// Services
import { ProductsService } from './services/products.service';
import { ColorService } from './services/color.service';
import { CategoryService } from './services/category.service';
import { AuthenticationService } from './services/authentication.service';
import { ShoppingCartService } from './services/shopping-cart.service';

// Guards
import { AuthGuard } from './guards/auth.guard';
import { OnlyIntegerDirective } from './directives/only-integer.directive';

// Translations
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SearchProductsViewComponent } from './components/search-products-view/search-products-view.component';
import { GraffitiTurorialComponent } from './components/graffiti-turorial/graffiti-turorial.component';
import { TutorialPageComponent } from './components/tutorial-page/tutorial-page.component';

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    ProductsViewComponent,
    LoginModalComponent,
    HomeComponent,
    NavbarComponent,
    SlideshowComponent,
    MenuComponent,
    I18nButtonComponent,
    CartModalComponent,
    ProductDetailsComponent,
    CategoryCardComponent,
    ProductsViewComponent,
    CategoriesGridComponent,
    ProductsGridComponent,
    ProductCardComponent,
    ColorDropdownComponent,
    VideosComponent,
    FooterComponent,
    OnlyIntegerDirective,
    OrderHistoryComponent,
    NotFoundComponent,
    SearchProductsViewComponent,
    GraffitiTurorialComponent,
    TutorialPageComponent
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
    TooltipModule.forRoot(),
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    })
  ],
  providers: [
    ProductsService,
    CategoryService,
    ColorService,
    AuthenticationService,
    ShoppingCartService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
