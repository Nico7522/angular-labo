import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address, AddressForm } from '../models/adress.model';
import { api } from '../../../environement/environement'

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private _httpClient: HttpClient) { }

  create(addressForm: AddressForm, userId: number) : Observable<boolean> {
    return this._httpClient.post<boolean>(`${api.url}/adress/addadress/${userId}`, addressForm)

  }

  getById(addressId: number): Observable<Address> {
    return this._httpClient.get<Address>(`${api.url}/adress/${addressId}`)
  }

  edit(addressForm: AddressForm, adressId: number) : Observable<Address> {
    return this._httpClient.put<Address>(`${api.url}/adress/${adressId}`, addressForm);
  }

  delete(addressId: number) : Observable<Address> {
    return this._httpClient.delete<Address>(`${api.url}/adress/${addressId}`)
  }


}
