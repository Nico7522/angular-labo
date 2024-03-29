import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';
import { api } from '../../../environement/environement'
import { CartProduct } from '../models/cart.model';
import { CartService } from '../services/cart.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {
  constructor(private _productService: ProductService, private _cartService: CartService){}
  imageUrl: string = api.img_url;
  mybreakpoint!: number;
  offset: number = 0;
  products: Product[] = [];
  ngOnInit() {
    this._productService.getProducts(this.offset).subscribe({
      next: (res) => { this.products = res.data;
      },
      error: () => {}
    })
    }

    addMore() {
      this.offset += 10;
      console.log(this.offset);
      
      this._productService.getProducts(this.offset).subscribe({
        next: (res) => { 
          res.data.forEach(p => this.products.push(p))
        },
        error: () => {}
      })

    }

    addToCart(product: CartProduct) {
      this._cartService.addToCart(product);
    }
  }
