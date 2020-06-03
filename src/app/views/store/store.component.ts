import { ProductService } from './../../shared/product.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-store',
	templateUrl: './store.component.html',
	styleUrls: [ './store.component.css' ]
})
export class StoreComponent implements OnInit {
	constructor(private http: HttpClient, private productApi: ProductService) {}
	products = [];
	show: boolean = false;
	ngOnInit(): void {
		this.productApi.getProducts().subscribe((data: { message: ''; data: [] }) => {
			this.products = data.data;
		});
	}

	focusIn() {
		this.show = true;
	}
	focusOut() {
		this.show = false;
	}
}
