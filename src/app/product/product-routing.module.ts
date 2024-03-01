import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilterComponent } from './filter/filter.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductComponent } from './product.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  { path: '', component: ProductComponent },
  { path: 'details/:id', component: ProductDetailsComponent },
  { path: 'filter', component: SearchComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
