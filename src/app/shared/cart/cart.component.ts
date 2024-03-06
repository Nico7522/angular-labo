import { Component, OnInit } from '@angular/core';
import { CartProduct } from '../../models/cart.model';
import { CartService } from '../../services/cart.service';
import { api } from '../../../../environement/environement'
import { Subject } from 'rxjs';
import { TokenService } from '../../services/token.service';
import { SnackbarService } from '../../services/snackbar.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

  imgUrl: string = api.img_url
  cartProduct: CartProduct[] = [];
  private _totalPrice: number = 0;
  totalPrice: number = 0;

  constructor(private _cartService: CartService, private _tokenService: TokenService, private _snackbarService: SnackbarService) {}

  toggleCart(visible: boolean) {
    this._cartService.toggleCart(visible);
  }

  remove(productId: number, sizeId: number){
    this._cartService.removeFromCart(productId, sizeId);
  }

  order() {
    if (this._tokenService.isTokenExist) {
      
      this._cartService.order().subscribe({
        next: () => {
          this._snackbarService.openSnackBar('Commande passée !', 1000)
        }
      }
      );
      
    }
  }

  ngOnInit(): void {
    this._cartService.$cartProduct.subscribe({
      next: (products) => {
        (this.cartProduct = products)
      },
    });

    this._cartService.$totalPrice.subscribe(total => {
      this._totalPrice = total; 
      console.log(total);
      this.totalPrice = Number(this._totalPrice.toFixed(2))
    });

  }
}
