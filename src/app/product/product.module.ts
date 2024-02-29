import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { MaterialModule } from '../shared/material/material.module';
import { DiscountPipe } from '../pipes/discount.pipe';
import { ProductDetailsComponent } from './product-details/product-details.component';


@NgModule({
  declarations: [
    ProductComponent,
    DiscountPipe,
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    MaterialModule,
    
  ]
})
export class ProductModule { }
