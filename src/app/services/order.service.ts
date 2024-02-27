import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private _httpClient: HttpClient) { }

//   getOrderById(orderId: number) : Observable<Order> {
//     return this._httpClient.get(`${}`)
//   }
// }
}