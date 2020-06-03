import { ProductService } from './../../shared/product.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
	selector: 'app-seller',
	templateUrl: './seller.component.html',
	styleUrls: [ './seller.component.css' ]
})
export class SellerComponent implements OnInit {
	products = [];
	product = {
		name: '',
		image: '',
		description: '',
		tag: '',
		category: '',
		regular_price: '',
		sale_price: '',
		stock: 0
	};
	constructor(private currencyPipe: CurrencyPipe, private http: HttpClient, private productApi: ProductService) {}
	formattedAmount;
	amount;
	selectedFile: File = null;
	ngOnInit(): void {
		this.fetchProduct();
	}

	fetchProduct() {
		this.productApi.getProducts().subscribe((data: { message: ''; data: [] }) => {
			this.products = data.data;
		});
	}
	transformAmount(element) {
		this.formattedAmount = this.currencyPipe.transform(this.formattedAmount, '$');

		element.target.value = this.formattedAmount;
	}

	onFileSelected(event) {
		console.log(event);
		this.selectedFile = <File>event.target.files[0];

		const fd = new FormData();
		fd.append('image', this.selectedFile, this.selectedFile.name);
		this.http.post('https://cherrygianan.herokuapp.com/api/upload_img', fd).subscribe((res: { url: '' }) => {
			this.product.image = res.url;
			console.log(res.url);
		});
	}
	onSumbit() {
		const fd = new FormData();
		//fd.append('image', this.selectedFile, this.selectedFile.name);
		//		this.product.image = this.selectedFile;
		this.productApi.storeProduct(this.product).subscribe((data: {}) => {
			this.fetchProduct();
		});
	}
}
