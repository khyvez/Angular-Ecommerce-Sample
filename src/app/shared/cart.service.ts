import { Observable } from 'rxjs';
import { Cart } from './cart';
import { Injectable, Output, EventEmitter, OnInit } from '@angular/core';
import { element } from 'protractor';

@Injectable({
	providedIn: 'root'
})
export class CartService {
	constructor() {}

	@Output() addCartEvent = new EventEmitter<number>();
	cartItems = JSON.parse(localStorage.getItem('cart')) || [];
	cartItemnumber: number = 0;

	cartCount() {}

	addCart(Cart) {
		this.cartItemnumber = 0;
		this.cartItems.push(Cart);
		localStorage.setItem('cart', JSON.stringify(this.cartItems));
		this.cartItems = JSON.parse(localStorage.getItem('cart'));
		this.cartItems.forEach((element) => {
			this.cartItemnumber += element.quantity;
		});

		this.addCartEvent.emit(this.cartItemnumber);
	}
	clearCart() {
		localStorage.removeItem('cart');
		this.cartItemnumber = 0;
		this.addCartEvent.emit(this.cartItemnumber);
	}
	updateCart(Cart) {
		this.cartItemnumber = 0;

		localStorage.setItem('cart', JSON.stringify(Cart));
		this.cartItems = JSON.parse(localStorage.getItem('cart'));
		this.cartItems.forEach((element) => {
			this.cartItemnumber += element.quantity;
		});

		this.addCartEvent.emit(this.cartItemnumber);
	}
	OnInit() {
		this.cartItemnumber = 0;
		this.cartItems.forEach((element) => {
			this.cartItemnumber += element.quantity;
		});
		this.addCartEvent.emit(this.cartItemnumber);
	}
}
