import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Category } from '../../models/category.model';
import { SizeStock } from '../../models/product.model';
import { Size } from '../../models/size.model';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import { SizeService } from '../../services/size.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss',
})
export class CreateProductComponent implements OnInit {
  categories: Category[] = [];
  sizes: Size[] = [];
  sizeStock: SizeStock[] = [];
  createProductForm!: FormGroup;

  constructor(
    private _productService: ProductService,
    private _sizeService: SizeService,
    private _categoryService: CategoryService,
    private _formBuilder: FormBuilder,
  ) {}
  ngOnInit(): void {
    this.createProductForm = this._formBuilder.group({
      modelName: [''],
      description: [''],
      brand: [''],
      sexe: [''],
      price: [''],
      discount: [''],
      categoriesId: [''],
      sizeStock: [''],
    });

    this._categoryService.getAll().subscribe({
      next: (categories) => (this.categories = categories),
    });

    this._sizeService.getAll().subscribe({
      next: (sizes) => (this.sizes = sizes),
    });
  }

  handleSubmit() {}

  handleSizeChange(e: any) {
    console.log(e);




  }
}
