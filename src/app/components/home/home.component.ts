import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { api } from '../../../../environement/environement';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  imageUrl: string = api.img_url;
  topProduct: Product[] = [];
  constructor(private _productService: ProductService) {}
  ngOnInit(): void {
    this._productService.getTopProduct().subscribe(res => this.topProduct = res.data);
  }


}
