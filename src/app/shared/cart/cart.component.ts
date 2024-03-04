import { Component, OnInit } from '@angular/core';
import { CartProduct } from '../../models/cart.model';
import { CartService } from '../../services/cart.service';
import { api } from '../../../../environement/environement'
import { Subject } from 'rxjs';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  imgUrl: string = api.img_url
  cartProduct: CartProduct[] = [];
  totalPrice: number = 0;
  constructor(private _cartService: CartService) {}

  toggleCart(visible: boolean) {
    this._cartService.toggleCart(visible);
  }

  remove(productId: number, sizeId: number){
    this._cartService.removeFromCart(productId, sizeId);
  }

  ngOnInit(): void {
    this._cartService.$cartProduct.subscribe({
      next: (products) => {
        (this.cartProduct = products)
      },
    });

    this._cartService.$totalPrice.subscribe(total => this.totalPrice = total);

  }
}
