import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { api } from '../../../environement/environement'
import { Filter } from '../models/filter.model';
import { editProductForm, Product } from '../models/product.model';
import { Response } from '../models/response.model'
import { SizeForm } from '../models/size.model';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private _$sizeForm = new ReplaySubject<SizeForm>();
  $sizeForm = this._$sizeForm.asObservable();
  constructor(private _httpClient: HttpClient) { }

  setSizeForm(sizeForm: SizeForm) {
    this._$sizeForm.next(sizeForm)
  }


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

  update(editProductForm: editProductForm, productId: number) : Observable<Response<Product>> {
   return this._httpClient.put<Response<Product>>(`${api.url}/product/${productId}`, editProductForm)
  }

  addCategoryToProduct(categoryId: number[], productId: number) : Observable<Response<Product>> {
    
    return this._httpClient.post<Response<Product>>(`${api.url}/product/${productId}/category`, {categoryId});
  }

  addSizeToProduct(sizeForm: SizeForm) {
    console.log(sizeForm);
    
    return this._httpClient.post(`${api.url}/product/${sizeForm.productId}/size/${sizeForm.sizeId}`, {stock: sizeForm.stock})
  }
}


