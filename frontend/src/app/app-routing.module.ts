/**
*  Copyright (C) 2017
*
*   Kaan K.
*
*  MIT License
*/

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsViewComponent } from './components/products-view/products-view.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { HomeComponent } from './components/home/home.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

import { AuthGuard } from './guards/auth.guard';

import { ProductsResolverService } from './resolver/products-resolver.service';
import { ProductDetailsResolverService } from './resolver/product-details-resolver.service';
import { CategoryResolverService } from './resolver/category-resolver.service';
import { ColorsResolverService } from './resolver/colors-resolver.service';
import { OrderHistoryResolverService } from './resolver/order-history-resolver.service';
import { ProfileResolverService } from './resolver/profile-resolver.service';

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
    },
    {
        path: 'user/history',
        component: OrderHistoryComponent,
        canActivate: [AuthGuard],
        resolve: {
            history: OrderHistoryResolverService
        }
    },
    {
        path: 'user/profile',
        component: ProfileComponent,
        canActivate: [AuthGuard],
        resolve: {
            profile: ProfileResolverService
        }
    },
    {
        path: '404',
        component: NotFoundComponent
    },
    {
        path: '**',
        redirectTo: '/404'
    }
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
        ColorsResolverService,
        OrderHistoryResolverService
    ]
})
export class AppRoutingModule { }
