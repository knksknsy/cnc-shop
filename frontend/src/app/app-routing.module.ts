import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccessoiresComponent } from './components/accessoires/accessoires.component';
import { CapsComponent } from './components/caps/caps.component';
import { ShoppingcartComponent } from './components/shoppingcart/shoppingcart.component';
import { AuthGuard } from './guards/auth.guard';
import { ProductsComponent } from './components/products/products.component';
import { HomeComponent } from './components/home/home.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'products', component: ProductsComponent },
    // Example. Not really necessary in ShoppingcardComponent.
    { path: 'shoppingcart', component: ShoppingcartComponent, canActivate: [AuthGuard] },
    { path: 'caps', component: CapsComponent },
    { path: 'accessoires', component: AccessoiresComponent },
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
        AuthGuard
    ]
})
export class AppRoutingModule { }
