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
  cartProduct: CartProduct[] = []
  constructor(private _cartService: CartService) {}

  toggleCart(visible: boolean) {
    this._cartService.toggleCart(visible);
  }

  ngOnInit(): void {
    this._cartService.$cartProduct.subscribe(products => this.cartProduct = products)
  }
}
