import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';
import { api } from '../../../environement/environement'
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {
  constructor(private _productService: ProductService){}
  imageUrl: string = api.img_url;
  mybreakpoint!: number;
  products: Product[] = [];
  ngOnInit() {
    this.mybreakpoint = (window.innerWidth <= 600) ? 1 : 4;
    this._productService.getProducts(0).subscribe({
      next: (res) => { this.products = res.data;
      },
      error: (err) => {}
    })
    }
  }
