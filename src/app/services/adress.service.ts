import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Adress, AdressForm } from '../models/adress.model';
import { api } from '../../../environement/environement'

@Injectable({
  providedIn: 'root'
})
export class AdressService {

  constructor(private _httpClient: HttpClient) { }

  create(adressForm: AdressForm, userId: number) : Observable<boolean> {
    return this._httpClient.post<boolean>(`${api.url}/adress/addadress/${userId}`, adressForm)
  }
}
