import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
@Component({
	selector: 'app-checkout',
	templateUrl: './checkout.component.html',
	styleUrls: [ './checkout.component.css' ]
})
export class CheckoutComponent implements OnInit {
	constructor() {}
	cartItem: any = [];
	grandTotalVal = 0;
	ngOnInit(): void {
		this.cartItem = JSON.parse(localStorage.getItem('cart'));
		console.log(this.cartItem);
	}

	grandTotal(total: number = 0) {
		this.grandTotalVal += total;
	}
}
