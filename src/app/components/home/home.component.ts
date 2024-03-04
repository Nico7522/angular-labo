import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { api } from '../../../../environement/environement';
import { Product } from '../../models/product.model';
import { trigger, transition } from '@angular/animations';
import { left, right } from '../../utils/animation';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations: [
    trigger('animImageSlider', [
      transition(':increment', right),
      transition(':decrement', left),
    ]),
  ]
})
export class HomeComponent implements OnInit {
  imageUrl: string = api.img_url;
  topProduct: Product[] = [];
  displayedProduct!: Product;
  number: number = 0;
  constructor(private _productService: ProductService) {}
  ngOnInit(): void {
    this._productService.getTopProduct().subscribe(res => {this.topProduct = res.data; this.displayedProduct = res.data[this.number]});
  }

  next() {
    this.number++;
    if (this.number >= this.topProduct.length) {
      this.number = 0; 
    }
    this.displayedProduct = this.topProduct[this.number];
  }
}
