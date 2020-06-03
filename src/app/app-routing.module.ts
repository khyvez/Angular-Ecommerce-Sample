import { SellerComponent } from './views/seller/seller.component';
import { CheckoutComponent } from './views/store/checkout/checkout.component';
import { CartComponent } from './views/store/cart/cart.component';
import { ProductComponent } from './views/store/product/product.component';

import { StoreComponent } from './views/store/store.component';
import { LoginComponent } from './views/user/login/login.component';
import { SignupComponent } from './views/user/signup/signup.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{ path: '', component: StoreComponent },
	{ path: 'view/:id', component: ProductComponent },
	{ path: 'cart', component: CartComponent },
	{ path: 'check-out', component: CheckoutComponent },
	{ path: 'dashboard', component: SellerComponent }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
