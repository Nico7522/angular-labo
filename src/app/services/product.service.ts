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

  constructor(private _hhtpClient: HttpClient) { }

  getProducts(offset : number): Observable<Response<Product[]>> {
    return this._hhtpClient.get<Response<Product[]>>(`${api.url}/product/paginate?offset?=${offset}`)
  }


}
