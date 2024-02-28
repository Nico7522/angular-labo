import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { api } from '../../../environement/environement'
import { Order } from '../models/order.model';
import { EditUserForm, User } from '../models/user.model';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _httpClient: HttpClient) { }

  GetById(userId: number) : Observable<User> {
    
    return this._httpClient.get<User>(`${api.url}/user/${userId}`)
  }

  
  getOrders(userId: number): Observable<Order[]> {
    return this._httpClient.get<Order[]>(`${api.url}/order/${userId}`).pipe(
      map((orders) => {
        orders.map((o) => {
          o.totalReduction =
            Number(o.totalReduction.toString().substring(2)) * 10;
          o.orderedProducts.map((p) => {
            p.reductionPerProduct =
              Number(p.reductionPerProduct.toString().substring(2)) * 10;
          });
        });
        return orders;
      })
    );
  }

  edit(editForm: EditUserForm, userId: number) : Observable<User> {
    return this._httpClient.put<User>(`${api.url}/user/${userId}`, editForm)
  }
}
