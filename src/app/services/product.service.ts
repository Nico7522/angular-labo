import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api } from '../../../environement/environement'
import { Filter } from '../models/filter.model';
import { Product } from '../models/product.model';
import { Response } from '../models/response.model'
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _httpClient: HttpClient) { }

  getProducts(offset : number): Observable<Response<Product[]>> {
    return this._httpClient.get<Response<Product[]>>(`${api.url}/product/paginate?offset=${offset}`)
  }

  getTopProduct() : Observable<Response<Product[]>> {
    return this._httpClient.get<Response<Product[]>>(`${api.url}/product/top`);
  }

  getById(productId: number): Observable<Response<Product>> {
    return this._httpClient.get<Response<Product>>(`${api.url}/product/${productId}`)
  }

  filter(filterForm: Filter) : Observable<Response<Product[]>> {
    const params = new HttpParams({
      fromObject: { ...filterForm },
    });
    return this._httpClient.get<Response<Product[]>>(`${api.url}/product/search/filter`, { params })
  }


}
