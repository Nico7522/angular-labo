import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { api } from '../../../environement/environement'
import { Filter } from '../models/filter.model';
import { CreateProductForm, editProductForm, Product } from '../models/product.model';
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

  create(form: CreateProductForm) : Observable<Response<Product>> {
    console.log(form);
    
    return this._httpClient.post<Response<Product>>(`${api.url}/product`, form)
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

  addSizeToProduct(sizeForm: SizeForm) : Observable<Response<Product>> {
    
    return this._httpClient.post<Response<Product>>(`${api.url}/product/${sizeForm.productId}/size/${sizeForm.sizeId}`, {stock: sizeForm.stock})
  }

  deleteCategoryFromProduct(productId: number, categoryId: number) : Observable<boolean> {
    return this._httpClient.delete<boolean>(`${api.url}/product/${productId}/category/${categoryId}`)
  }

  updateStock(sizeId: number, productId: number, stock: number) : Observable<Response<Product>> {
    return this._httpClient.patch<Response<Product>>(`${api.url}/product/stock/${sizeId}/${productId}`, {stock})
  }

  updateImage(image: File, productId: number) : Observable<Response<string>> {
    const formData: FormData = new FormData();
    formData.append('file', image);
    return this._httpClient.put<Response<string>>(`${api.url}/product/${productId}/image`, formData)
  }

  deleteCategory(productId: number, categoryId: number) : Observable<boolean>{
    return this._httpClient.delete<boolean>(`${api.url}/product/${productId}/category/${categoryId}`);

  }

  deleteSize(productId: number, sizeId: number): Observable<boolean> {
    return this._httpClient.delete<boolean>(`${api.url}/product/${productId}/size/${sizeId}`);
  }

  delete(productId: number) : Observable<Response<Product>> {
    return this._httpClient.delete<Response<Product>>(`${api.url}/product/${productId}`)
  }
}


