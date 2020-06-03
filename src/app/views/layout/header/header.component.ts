import { ProductService } from './../../../shared/product.service';
import { CartService } from './../../../shared/cart.service';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: [ './header.component.css' ]
})
export class HeaderComponent implements OnInit {
	@Input() addtoCart: string;
	productCart = JSON.parse(localStorage.getItem('cart')) || [];
	cartCount: number = 0;
	criteria: string = '';
	product: any = [];
	constructor(private cartService: CartService, private productApi: ProductService) {}

	ngOnInit(): void {
		this.cartService.addCartEvent.subscribe((data: number) => {
			this.cartCount = data;
		});
		this.cartService.OnInit();
	}
	cartRefresh() {}

	addCart() {
		if (this.addtoCart == 'add') {
			this.cartCount += 1;
		}
	}
	searchProduct($event) {
		if (this.criteria.length > 2) {
			this.productApi.searchProduct(this.criteria).subscribe((data: {}) => {
				this.product = data;
				console.log(data);
			});
		} else {
			this.product = [];
		}
	}
}
