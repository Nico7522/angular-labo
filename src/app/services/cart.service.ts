import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartOrder, CartProduct } from '../models/cart.model';
import { TokenService } from './token.service';
import { api } from '../../../environement/environement'
import { OrderedProducts } from '../models/order.model';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _$isCartVisible = new Subject<boolean>();
  $isVisible = this._$isCartVisible.asObservable();
  private _cartLength: number = 0;
  private _$cartLength: BehaviorSubject<number> = new BehaviorSubject(
    this._cartLength
  );
  $cart_length = this._$cartLength.asObservable();

  private _cartProduct: CartProduct[] = [];
  private _cartProductOrder: CartProduct[] = [];

  private _$cartProduct: BehaviorSubject<CartProduct[]> = new BehaviorSubject<
  CartProduct[]
  >(this._cartProduct);
  $cartProduct = this._$cartProduct.asObservable();
  
  private _totalPrice: number = 0;
  private _$totalPrice: BehaviorSubject<number> = new BehaviorSubject<number>(this._totalPrice)
  $totalPrice = this._$totalPrice.asObservable();
  constructor(
    private _tokenService: TokenService,
    private _httpClient: HttpClient
  ) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  toggleCart(visible: boolean) {
    this._$isCartVisible.next(visible);
  }

  addToCart(product: CartProduct) {
    
    let canAdd = true;
    this._cartProduct.map((p) => {
     
      if (product.productId === p.productId && product.sizeId === p.sizeId) {
        p.quantity = p.quantity + 1;
        canAdd = false;
        this._cartLength++;
        this._$cartProduct.next(this._cartProduct);
        this._$cartLength.next(this._cartLength);
      }
    });

    if (canAdd) {
      this._cartProduct.push(product);
      this._$cartProduct.next(this._cartProduct);
      this._cartLength++;
      this._$cartLength.next(this._cartLength);
      
    }
    this._totalPrice += (product.price - (product.price*product.discount));
    this._$totalPrice.next(this._totalPrice);

    //
    
    }

    removeFromCart(productId: number, sizeId: number): void {
      this._cartProduct = this._cartProduct.filter((p) => {
        if (p.productId === productId) {
          if (p.sizeId === sizeId) {
            if (p.quantity >= 1) {
              this._cartLength = this._cartLength - 1;
              this._$cartLength.next(this._cartLength);
              this._totalPrice -= (p.price - (p.price*p.discount));
              this._$totalPrice.next(this._totalPrice);
              return (p.quantity = p.quantity - 1);
            } else {
              this._cartLength = this._cartLength - 1;
              this._$cartLength.next(this._cartLength);
              this._totalPrice -= (p.price - (p.price*p.discount));
              this._$totalPrice.next(this._totalPrice);
              return false;
            }
          } else {
            return true;
          }
        }
        return true;
      });
      this._$cartProduct.next(this._cartProduct);
    }

  order() {

      let order: CartOrder = {
        userId: this._tokenService.decodeToken().id,
        totalReduction: 0.2,
        orderProduct: this._cartProduct,
      };

      console.log(order);
      this._httpClient
        .post(`${api.url}/order`, order)
        .subscribe((res) => console.log(res));
  }
}
