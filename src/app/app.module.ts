import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { UserComponent } from './views/user/user.component';
import { LoginComponent } from './views/user/login/login.component';
import { SignupComponent } from './views/user/signup/signup.component';
import { StoreComponent } from './views/store/store.component';
import { ProductComponent } from './views/store/product/product.component';
import { CartComponent } from './views/store/cart/cart.component';
import { OrderComponent } from './views/store/order/order.component';
import { CheckoutComponent } from './views/store/checkout/checkout.component';
import { SellerComponent } from './views/seller/seller.component';
import { HeaderComponent } from './views/layout/header/header.component';
import { FooterComponent } from './views/layout/footer/footer.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
@NgModule({
	declarations: [
		AppComponent,
		UserComponent,
		LoginComponent,
		SignupComponent,
		StoreComponent,
		ProductComponent,
		CartComponent,
		OrderComponent,
		CheckoutComponent,
		SellerComponent,
		HeaderComponent,
		FooterComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		ReactiveFormsModule,
		EditorModule,
		FormsModule,
		HttpClientModule,
		RouterModule
	],
	providers: [ CurrencyPipe ],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
