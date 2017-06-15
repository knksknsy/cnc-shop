/**
*  Copyright (C) 2017
*
*   Kaan K.
*
*  MIT License
*/

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccessoiresComponent } from './components/accessoires/accessoires.component';
import { CapsComponent } from './components/caps/caps.component';
import { ShoppingcartComponent } from './components/shoppingcart/shoppingcart.component';
import { ProductsViewComponent } from './components/products-view/products-view.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { HomeComponent } from './components/home/home.component';

import { AuthGuard } from './guards/auth.guard';

import { ProductsResolverService } from './resolver/products-resolver.service';
import { ProductDetailsResolverService } from './resolver/product-details-resolver.service';
import { CategoryResolverService } from './resolver/category-resolver.service';
import { ColorsResolverService } from './resolver/colors-resolver.service';

const appRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
        resolve: {
            categories: CategoryResolverService
        }
    },
    {
        path: 'products/category/:category',
        component: ProductsViewComponent,
        resolve: {
            products: ProductsResolverService,
            categories: CategoryResolverService
        }
    },
    {
        path: 'products/details/:id',
        component: ProductDetailsComponent,
        resolve: {
            details: ProductDetailsResolverService,
            colors: ColorsResolverService
        }
    }
    // { 
    //   path: '',
    //   redirectTo: '/component_name',
    //   pathMatch: 'full'
    // }
    // {
    //   path: '/component_name',
    //   component: ComponentName,
    //   data: { property: 'idk' }
    // }
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
        AuthGuard,
        ProductsResolverService,
        ProductDetailsResolverService,
        CategoryResolverService,
        ColorsResolverService
    ]
})
export class AppRoutingModule { }
