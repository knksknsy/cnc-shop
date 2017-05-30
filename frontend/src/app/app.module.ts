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

// Modules
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { ProductsComponent } from './components/products/products.component';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AccessoiresComponent } from './components/accessoires/accessoires.component';
import { CapsComponent } from './components/caps/caps.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SlideshowComponent } from './components/slideshow/slideshow.component';
import { ShoppingcartComponent } from './components/shoppingcart/shoppingcart.component';
import { StaticBilderComponent } from './components/static-bilder/static-bilder.component';

// Services
import { ProductsService } from './services/products.service';
import { AuthenticationService } from './services/authentication.service';

// Guards
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    LoginModalComponent,
    ProfileComponent,
    AccessoiresComponent,
    CapsComponent,
    HomeComponent,
    NavbarComponent,
    SlideshowComponent,
    ShoppingcartComponent,
    StaticBilderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    AppRoutingModule
  ],
  providers: [ProductsService, AuthenticationService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }