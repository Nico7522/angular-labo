import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from '../../models/category.model';
import { CreateProductForm, SizeStock } from '../../models/product.model';
import { Size } from '../../models/size.model';
import { CategoryService } from '../../services/category.service';
import { ModalService } from '../../services/modal.service';
import { ProductService } from '../../services/product.service';
import { SizeService } from '../../services/size.service';
import { SnackbarService } from '../../services/snackbar.service';
import { SetStockComponent } from './set-stock/set-stock.component';

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
    private _modalService: ModalService,
    private _sizeService: SizeService,
    private _categoryService: CategoryService,
    private _formBuilder: FormBuilder,
    private _snackbarService: SnackbarService,
    private _router: Router
  ) {}
  ngOnInit(): void {
    this.createProductForm = this._formBuilder.group({
      modelName: ['', [Validators.required]],
      description: ['', [Validators.required]],
      brand: ['', [Validators.required]],
      sexe: ['', [Validators.required]],
      price: ['', [Validators.required]],
      discount: [0],
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

  handleSubmit() {
    if (this.createProductForm.valid) {
      let form: CreateProductForm = {
        modelName: this.createProductForm.get('modelName')?.value,
        description: this.createProductForm.get('description')?.value,
        brand: this.createProductForm.get('brand')?.value,
        sexe: this.createProductForm.get('sexe')?.value,
        price: this.createProductForm.get('price')?.value,
        discount: this.createProductForm.get('discount')?.value,
        categoriesId: this.createProductForm.get('categoriesId')?.value ? this.createProductForm.get('categoriesId')?.value : [],
        sizeStock: this.sizeStock ? this.sizeStock : [],
      };
      this._productService.create(form).subscribe({
        next: (res) => {
          this._snackbarService.openSnackBar('Produit crée !')
          setTimeout(() => {  
              this._router.navigate(['/admin/product/details', res.data.productId])
          }, 2000);
        }
      });
    }
  }

  handleSizeChange(e: any) {
    console.log(e);

    const dialogRef = this._modalService.openModal(
      SetStockComponent,
      '200ms',
      '200ms',
      undefined,
      '300px'
    );

    dialogRef.afterClosed().subscribe({
      next: (stock) => {
        if(stock) {
          let st: SizeStock = {
            size: e.size,
            sizeId: e.sizeId,
            stock: stock,
          };
          this.sizeStock.push(st);
          this.createProductForm.get('sizeStock')?.reset();
          console.log(this.sizeStock);
        }
      },
    });
  }

  createProduct() {}
  removeSizeStock(sizeId: number) {
    this.sizeStock = this.sizeStock.filter((st) => {
      return st.sizeId !== sizeId;
    });
  }
}
