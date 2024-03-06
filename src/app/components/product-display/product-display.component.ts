import { Component, Input } from '@angular/core';
import { Product } from '../../models/product.model';
import { api } from '../../../../environement/environement'

@Component({
  selector: 'app-product-display',
  templateUrl: './product-display.component.html',
  styleUrl: './product-display.component.scss'
})
export class ProductDisplayComponent {
  imageUrl: string = api.img_url;
  @Input() product!: Product;
}
