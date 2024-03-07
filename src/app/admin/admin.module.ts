import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MaterialModule } from '../shared/material/material.module';
import { UserComponent } from './user/user.component';
import { ProductComponent } from './product/product.component';
import { SharedModule } from '../shared/shared.module';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditProductComponent } from './edit-product/edit-product.component';
import { UpdateStockComponent } from './update-stock/update-stock.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { SetStockComponent } from './create-product/set-stock/set-stock.component';
import { ConfirmDeleteComponent } from './product-details/confirm-delete/confirm-delete.component';


@NgModule({
  declarations: [
    AdminComponent,
    UserComponent,
    ProductComponent,
    ProductDetailsComponent,
    EditProductComponent,
    UpdateStockComponent,
    CreateProductComponent,
    SetStockComponent,
    ConfirmDeleteComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AdminModule { }
