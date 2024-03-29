import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { MaterialModule } from '../shared/material/material.module';
import { DiscountPipe } from '../pipes/discount.pipe';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { FilterComponent } from './filter/filter.component';
import { SearchComponent } from './search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ProductComponent,
    ProductDetailsComponent,

    FilterComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule
    
  ],

})
export class ProductModule { }
