import { Location } from '@angular/common';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
import { map } from 'rxjs';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';

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
  productImg!: File;
  message!: string;

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
    private _formBuilder: FormBuilder,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.productId = this._activatedRoute.snapshot.params['id'];
    this._productService.getById(this.productId).subscribe({
      next: (res) => (this.product = res.data),
    });

    this.sizeForm = this._formBuilder.group({
      sizeId: [''],
      stock: [''],
    });
  }

  onImgChange(event: any) {
    this.productImg = event.target.files[0];
    console.log(this.productImg);

    this._productService
      .updateImage(this.productImg, this.productId)
      .subscribe({
        next: (res) => {
          this.product.image = res.data;
          this.message = 'Image modifiée.';
        },
        error: (err) => {
          this.message = 'Une erreur est survenue.';
        },
      });
  }

  updateImage(productId: number) {
    console.log(this.productImg, this.productId);
  }

  back() {
    this._location.back();
  }

  edit() {
    const dialogRef = this._modalService.openModal(
      EditProductComponent,
      '300ms',
      '300ms',
      '500px',
      '500px',
      this.product
    );

    dialogRef.afterClosed().subscribe({
      next: (data: Product) => {
        if (data) {
          this.product = data;
        }
      },
    });
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
            console.log(res);

            this._snackbarService.openSnackBar('Catégorie ajoutée !');
            this.product.categories = res.data.categories;
          },
          error: (err) => {
            this.alertMessage = "Une erreur s'est produite.";
          },
        });
    }
  }

  openAddSize() {
    if (this.isSizeFormOpen) {
      this.isSizeFormOpen = false;
    } else {
      this.isSizeFormOpen = true;
    }

    this._sizeService.getAll().subscribe({
      next: (sizes) => (this.sizes = sizes),
    });
  }

  handleSize() {
    if (this.sizeForm.valid) {
      const sizeForm: SizeForm = {
        productId: this.product.productId,
        sizeId: this.sizeForm.get('sizeId')?.value,
        stock: this.sizeForm.get('stock')?.value,
      };
      this._productService.addSizeToProduct(sizeForm).subscribe({
        next: (res) => {
          this.product.sizes = res.data.sizes;
          this._snackbarService.openSnackBar('Taille ajoutée !');
        },
        error: (err) => {
          this.alertMessage = "Une erreur s'est produite.";
        },
      });
    }
  }

  openUpdateStockModal(sizeId: number) {
    const modalRef = this._modalService.openModal(
      UpdateStockComponent,
      '300ms',
      '300ms',
      '300px',
      '400px',
      { sizeId: sizeId, productId: this.productId }
    );

    modalRef.afterClosed().subscribe({
      next: (data: number) => {
        this.product.sizes = this.product.sizes.filter((x) => {
          if (x.sizeId === sizeId) {
            return (x.stock = data);
          }
          return x;
        });
      },
    });
  }

  deleteCategory(categoryId: number) {
    this._productService.deleteCategory(this.productId, categoryId).subscribe({
      next: () => {
        this._snackbarService.openSnackBar('Catégorie supprimée !');
        this.product.categories = this.product.categories.filter((x) => {
          return x.categoryId !== categoryId;
        });
      },
      error: (err) => {
        this.alertMessage = "Une erreur s'est produite.";
      },
    });
  }

  deleteSize(sizeId: number) {
    this._productService.deleteSize(this.product.productId, sizeId).subscribe({
      next: () => {
        this._snackbarService.openSnackBar('Taille supprimée !');
        this.product.sizes = this.product.sizes.filter((x) => {
          return x.sizeId !== sizeId;
        });
      },
      error: () => {
        this.alertMessage = "Une erreur s'est produite.";
      },
    });
  }

  delete() {
    const dialogRef = this._modalService.openModal(
      ConfirmDeleteComponent,
      '200ms',
      '200ms'
    );

    dialogRef.afterClosed().subscribe({
      next: (confirmation) => {
        if (confirmation) {
          this._productService.delete(this.productId).subscribe({
            next: () => {
              this._snackbarService.openSnackBar('Produit supprimé !');
              this._router.navigate(['/admin/product']);
            },
            error: (err) => {
              this.alertMessage = "Une erreur s'est produite.";
            },
          });
        }
      },
    });
  }
}
