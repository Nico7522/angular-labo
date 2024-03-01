import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartOrder, CartProduct } from '../models/cart.model';
import { TokenService } from './token.service';
import { api } from '../../../environement/environement'
@Injectable({
  providedIn: 'root'
})
export class CartService {

  private _cartLength: number = 0;
  private _$cartLength: BehaviorSubject<number> = new BehaviorSubject(
    this._cartLength
  );
  $cart_length = this._$cartLength.asObservable();

  private _cartProduct: CartProduct[] = [];
  private _$cartProduct: BehaviorSubject<CartProduct[]> = new BehaviorSubject<
    CartProduct[]
  >(this._cartProduct);
  $cartProduct = this._$cartProduct.asObservable();

  constructor(private _tokenService: TokenService, private _httpClient: HttpClient) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  addToCart(product: CartProduct) {
    let canAdd = true;
    this._cartProduct.map((p) => {
      if (product.productId === p.productId && product.sizeId === p.sizeId) {
        p.quantity = p.quantity + 1;
        canAdd = false;
        this._cartLength++;
        this._$cartLength.next(this._cartLength);
      }
    });

    if (canAdd) {
      this._cartProduct.push(product);
      this._$cartProduct.next(this._cartProduct);
      this._cartLength++;
      this._$cartLength.next(this._cartLength);
    }
    this._$cartProduct.subscribe((o) => console.log(o));
    this.$cart_length.subscribe((l) => console.log('Taille du panier : ', l));
  }

  removeFromCart(productId: number, sizeId: number): void {
    console.log('productId : ', productId + 'sizeId', sizeId);

    this._cartProduct = this._cartProduct.filter((p) => {
      if (p.productId === productId && p.sizeId === sizeId) {
        this._cartLength = this._cartLength - p.quantity;
        this._$cartLength.next(this._cartLength);
      }
      return !(p.productId === productId && p.sizeId === sizeId);
    });
    this._$cartProduct.next(this._cartProduct);
  }

  createCommand() {
    if(!this._tokenService.isTokenExist) {
      return;
    } else {
      let order: CartOrder = {
        userId: this._tokenService.decodeToken().id,
        totalReduction: 0.20,
        orderProduct: this._cartProduct
      }
      console.log(order);
      this._httpClient.post(`${api.url}/order`, order).subscribe(res => console.log(res)
      )

    }
    // POSTER LA COMMMANDE
  }
}
