import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Product } from './product';

@Injectable({
	providedIn: 'root'
})
export class ProductService {
	constructor(private http: HttpClient) {}
	param: { criteria: '' };
	apiURL = 'https://cherrygianan.herokuapp.com/api';
	httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json'
		})
	};

	getProducts() {
		return this.http.get<any>(this.apiURL + '/product').pipe(retry(1), catchError(this.handleError));
	}
	getProduct(id): Observable<Product> {
		return this.http.get<Product>(this.apiURL + '/product/' + id).pipe(retry(1), catchError(this.handleError));
	}

	storeProduct(Product): Observable<Product> {
		return this.http
			.post<Product>(this.apiURL + '/product', JSON.stringify(Product), this.httpOptions)
			.pipe(retry(1), catchError(this.handleError));
	}
	searchProduct(str: string = '') {
		return this.http.get<Product>(this.apiURL + '/search/' + str).pipe(retry(1), catchError(this.handleError));
	}

	handleError(error) {
		let errorMessage = '';
		if (error.error instanceof ErrorEvent) {
			// Get client-side error
			errorMessage = error.error.message;
		} else {
			// Get server-side error
			errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
		}
		window.alert(errorMessage);
		return throwError(errorMessage);
	}
}
