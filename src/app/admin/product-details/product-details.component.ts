import { Location } from '@angular/common';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { api } from '../../../../environement/environement';
import { ModalService } from '../../services/modal.service';
import { EditProductComponent } from '../edit-product/edit-product.component';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SnackbarService } from '../../services/snackbar.service';
import { SizeService } from '../../services/size.service';
import { Size, SizeForm } from '../../models/size.model';
import { UpdateStockComponent } from '../update-stock/update-stock.component';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ProductDetailsComponent implements OnInit {
  imageUrl: string = api.img_url;
  onEdit: boolean = true;
  productId!: number;
  product!: Product;
  isCategoryFormOpen: boolean = false;
  isSizeFormOpen: boolean = false;
  categories: Category[] = [];
  sizes: Size[] = [];
  sizeStock!: SizeForm;
  stock!: number;

  categoryForm = new FormControl('');
  sizeForm!: FormGroup;

  alertMessage!: string;
  constructor(
    private _productService: ProductService,
    private _activatedRoute: ActivatedRoute,
    private _location: Location,
    private _modalService: ModalService,
    private _categoryService: CategoryService,
    private _snackbarService: SnackbarService,
    private _sizeService: SizeService,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.productId = this._activatedRoute.snapshot.params['id'];
    this._productService.getById(this.productId).subscribe({
      next: (res) => (this.product = res.data),
    });

    this.sizeForm = this._formBuilder.group({
      sizeId: [''],
      stock: [''],
    })
  }

  back() {
    this._location.back();
  }

  edit() {
    this._modalService.openModal(
      EditProductComponent,
      '300ms',
      '300ms',
      '500px',
      '500px',
      this.product
    );
  }

  openAddCategory() {
    if (this.isCategoryFormOpen) {
      this.isCategoryFormOpen = false;
    } else {
      this.isCategoryFormOpen = true;
    }

    this._categoryService.getAll().subscribe({
      next: (categories) => (this.categories = categories),
    });
  }

  handleCategories() {
    if (this.categoryForm.valid) {
      const categories: number[] = this.categoryForm.value as any as number[];
      console.log(categories);

      this._productService
        .addCategoryToProduct(categories, this.product.productId)
        .subscribe({
          next: (res) => {
            console.log("cc");
            
            this._snackbarService.openSnackBar('Catégorie ajoutée !');
          },
          error: (err) => {
            this.alertMessage = "Une erreur s'est produite.";
          },
        });
    }
  }

  openAddSize(){
    if (this.isSizeFormOpen) {
      this.isSizeFormOpen = false;
    } else {
      this.isSizeFormOpen = true;
    }

    this._sizeService.getAll().subscribe({
      next: (sizes) => (this.sizes = sizes),
    });
  }

  handleSize(){
    if(this.sizeForm.valid) {
      const sizeForm: SizeForm = {
        productId: this.product.productId,
        sizeId: this.sizeForm.get("sizeId")?.value,
        stock: this.sizeForm.get('stock')?.value,
      }
      this._productService.addSizeToProduct(sizeForm).subscribe(res => console.log(res))
    }
  }

  openUpdateStockModal(sizeId: number) {
    this._modalService.openModal(UpdateStockComponent, '300ms', '300ms', '300px', '400px', {sizeId: sizeId, productId: this.productId });
  }

 
}
