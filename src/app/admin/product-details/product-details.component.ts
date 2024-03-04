import { Location } from '@angular/common';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { api } from '../../../../environement/environement';
import { ModalService } from '../../services/modal.service';
import { EditProductComponent } from '../edit-product/edit-product.component';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ProductDetailsComponent implements OnInit {
  imageUrl: string = api.img_url;
  onEdit: boolean = true;
  productId!: number;
  product!: Product;

  constructor(private _productService: ProductService, private _activatedRoute: ActivatedRoute, private _location: Location, private _modalService: ModalService){}


  ngOnInit(): void {
    this.productId = this._activatedRoute.snapshot.params["id"];
    this._productService.getById(this.productId).subscribe({
      next: (res) => this.product = res.data
    })
  }

  back(){
    this._location.back();
  }

  edit() {
    this._modalService.openModal(EditProductComponent, '300ms', "300ms", undefined, undefined, this.product)
  }


}
