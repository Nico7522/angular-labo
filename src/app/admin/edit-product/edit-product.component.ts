import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '../../models/product.model';
import { ModalService } from '../../services/modal.service';
import { ProductService } from '../../services/product.service';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss',
})
export class EditProductComponent implements OnInit {
  product!: Product;
  editForm!: FormGroup;
  alertMessage!: string;
  isCategoryFormOpen: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Product,
    private _formBuilder: FormBuilder,
    private _modalService: ModalService,
    private _snackbarService: SnackbarService,
    private _productService: ProductService,
    
  ) {}
  ngOnInit(): void {
    this.product = this.data;
    console.log(this.product);
    this.editForm = this._formBuilder.group({
      description: ['', [Validators.required]],
      modelName: ['', [Validators.required]],
      price: ['', [Validators.required]],
      sexe: ['', [Validators.required]],
      brand: ['', [Validators.required]],
      discount: ['', [Validators.required]],
    });

    this.editForm.patchValue(this.product);
  }

  close() {
    this._modalService.closeModal();
  }

  handleSubmit() {
    if (this.editForm.valid) {
      this._productService
        .update(this.editForm.value, this.product.productId)
        .subscribe({
          next: (res) => {
            this._modalService.closeModal();
            this._snackbarService.openSnackBar('Produit édité');
          },
          error: (err) => {this.alertMessage = "Une erreur s'est produite."},
        });
    }
  }


}
