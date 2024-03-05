import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api } from '../../../environement/environement'
import { Category } from '../models/category.model';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _httpClient: HttpClient) { }

  getAll(): Observable<Category[]> {
    return this._httpClient.get<Category[]>(`${api.url}/category`)
  }

}
