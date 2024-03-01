import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { api } from '../../../../environement/environement'
import { CartService } from '../../services/cart.service';
import { CartProduct } from '../../models/cart.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  productId!: number;
  product!: Product
  selectedSize!: number;
  errorMessage!: string;
  loading: boolean = true;
  imageUrl: string = api.img_url;
  constructor(private _productService: ProductService, private _activatedRoute: ActivatedRoute, private _cartService: CartService){}
  ngOnInit(): void {
    
    
    this.productId = this._activatedRoute.snapshot.params["id"];
    this._productService.getById(this.productId).subscribe({
      next: (res) => {
        this.product = res.data;
      },
      error: (err) => {
        this.errorMessage = "Le produit n'a pas été trouvé."
      },
    })
  }

  handleSize(event: any) {
    this.selectedSize = event.value;
    
  }

  addToCart() {
    const product: CartProduct = {
      modelName: this.product.modelName,
      sizeId: this.selectedSize,
      productId: this.product.productId,
      price: this.product.price,
      discount: this.product.discount,
      quantity: 1,
      image: this.product.image,
    };
    this._cartService.addToCart(product)
  }


}
