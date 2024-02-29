import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api } from '../../../environement/environement'
import { Product } from '../models/product.model';
import { Response } from '../models/response.model'
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _htpClient: HttpClient) { }

  getProducts(offset : number): Observable<Response<Product[]>> {
    return this._htpClient.get<Response<Product[]>>(`${api.url}/product/paginate?offset=${offset}`)
  }

  getById(productId: number): Observable<Response<Product>> {
    return this._htpClient.get<Response<Product>>(`${api.url}/product/${productId}`)
  }


}
