import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { api } from '../../../../environement/environement';
import { Product } from '../../models/product.model';
import { trigger, transition, query, style, animate, group } from '@angular/animations';
const left = [
  query(':enter, :leave', style({ width: '100%' }), { optional: true }),
  group([
    query(':enter', [style({ transform: 'translateX(-100%)' }), animate('.3s ease-out', style({ transform: 'translateX(0%)' }))], {
      optional: true,
    }),
    query(':leave', [style({ transform: 'translateX(0%)',  display: "none"  }), animate('.3s ease-out', style({ transform: 'translateX(100%)' }))], {
      optional: true,
    }),
  ]),
];

const right = [
  query(':enter, :leave', style({ width: '100%' }), { optional: true }),
  group([
    query(':enter', [style({ transform: 'translateX(100%)',  display: 'none'  }), animate('.3s ease-out', style({ transform: 'translateX(0%)' }))], {
      optional: true,
    }),
    query(':leave', [style({ transform: 'translateX(0%)',   }), animate('.3s ease-out', style({ transform: 'translateX(-100%)' }))], {
      optional: true,
    }),
  ]),
];

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

  previous() {
    this.number--;
    if (this.number < 0) {
      this.number = this.topProduct.length - 1; 
    }
    this.displayedProduct = this.topProduct[this.number];
  }
  
  


}
