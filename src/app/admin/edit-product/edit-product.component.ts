import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss',
})
export class EditProductComponent implements OnInit {
  product!: Product;
  editForm!: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Product,
    private _formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.product = this.data;
    console.log(this.product);
    this.editForm = this._formBuilder.group({
      description: [''],
      modelName: [''],
      price: [''],
      brand: [''],
      discount: [''],
    });

    this.editForm.patchValue(this.product);
  }
}
