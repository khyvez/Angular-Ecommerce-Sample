import { CartService } from './../../../shared/cart.service';
import { ProductService } from './../../../shared/product.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import Swal from 'sweetalert2';
import { Product } from 'src/app/shared/product';
import { Subscription } from 'rxjs';
@Component({
	selector: 'app-product',
	templateUrl: './product.component.html',
	styleUrls: [ './product.component.css' ]
})
export class ProductComponent implements OnInit {
	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private productApi: ProductService,
		private cartService: CartService,
		private activateRoute: ActivatedRoute
	) {
		activateRoute.params.subscribe((params) => {
			this.setupComponent(params['someParam']);
		});
	}
	quantity = new FormControl(0);
	productCart = JSON.parse(localStorage.getItem('cart')) || [];
	product: any = {};
	addingItem = { id: 0, image: '', name: '', price: '', quantity: 0 };
	userSubscription: Subscription;
	id: number = 0;

	ngOnInit(): void {
		this.productDetail();
	}

	productDetail() {
		this.route.paramMap.subscribe((params) => {
			this.id = +params.get('id');
		});

		this.productApi.getProduct(this.id).subscribe((data: {}) => {
			this.product = data;
		});
	}

	setupComponent(someParam) {
		this.productDetail();
	}
	changeQuantity(addSub) {
		var i = this.quantity.value;
		if (addSub == 'add') {
			this.quantity.setValue((i += 1));
		} else {
			if (this.quantity.value > 0) this.quantity.setValue((i -= 1));
		}
	}

	addCart() {
		if (this.quantity.value > 0) {
			const Toast = Swal.mixin({
				toast: true,
				position: 'top-end',
				showConfirmButton: false,
				timer: 1000,
				timerProgressBar: true,
				onOpen: (toast) => {
					toast.addEventListener('mouseenter', Swal.stopTimer);
					toast.addEventListener('mouseleave', Swal.resumeTimer);
				}
			});

			Toast.fire({
				icon: 'success',
				title: 'Sucesfully added to cart'
			});

			this.addingItem.id = this.product.data.id;
			this.addingItem.image = this.product.data.image;
			this.addingItem.name = this.product.data.name;
			this.addingItem.price = this.product.data.sale_price;
			this.addingItem.quantity = this.quantity.value;
			this.cartService.addCart(this.addingItem);
		}
	}
}
