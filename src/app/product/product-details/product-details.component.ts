import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { api } from '../../../../environement/environement'

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  productId!: number;
  product!: Product
  errorMessage!: string;
  loading: boolean = true;
  imageUrl: string = api.img_url;
  constructor(private _productService: ProductService, private _activatedRoute: ActivatedRoute){}
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




}
