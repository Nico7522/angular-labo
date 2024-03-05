import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api } from '../../../environement/environement'
import { Size } from '../models/size.model';
@Injectable({
  providedIn: 'root'
})
export class SizeService {

  constructor(private _httpClient: HttpClient) { }

  getAll() : Observable<Size[]> {
    return this._httpClient.get<Size[]>(`${api.url}/size`)
  }

}
