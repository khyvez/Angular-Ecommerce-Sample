import { CartService } from './../../../shared/cart.service';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
@Component({
	selector: 'app-cart',
	templateUrl: './cart.component.html',
	styleUrls: [ './cart.component.css' ]
})
export class CartComponent implements OnInit {
	constructor(private cart: CartService) {}
	cartItems = [];
	uniqueItem = [];
	quantity: number = 0;

	itemCount = 0;
	ngOnInit(): void {
		this.cartItems = JSON.parse(localStorage.getItem('cart'));
		this.mergingCart();
	}

	mergingCart() {
		const ans = _(this.cartItems)
			.groupBy('id')
			.map((obj, key) => ({
				name: obj[0].name,
				image: obj[0].image,
				id: key,
				price: obj[0].price,
				quantity: _.sumBy(obj, 'quantity')
			}))
			.value();
		this.itemCount = ans.length;
		this.uniqueItem = ans;
	}

	clearCart() {
		this.cart.clearCart();
		this.cartItems = [];
		this.mergingCart();
	}
	removeItem(id: number) {
		this.uniqueItem = this.uniqueItem.filter((item) => item.id !== id);
		this.cart.updateCart(this.uniqueItem);
		this.itemCount = this.uniqueItem.length;
	}

	changeQuantity(addSub, id) {
		if (addSub == 'add') {
			this.uniqueItem[id].quantity += 1;
		} else {
			if (this.uniqueItem[id].quantity > 0) this.uniqueItem[id].quantity -= 1;
		}
		this.cart.updateCart(this.uniqueItem);
	}
}
