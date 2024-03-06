import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { checkAdminGuard } from '../guards/check-admin.guard';
import { AdminComponent } from './admin.component';
import { ProductDetailsComponent as ProductDetailsAdmin } from './product-details/product-details.component';
import { ProductComponent } from './product/product.component';
import { UserComponent } from './user/user.component';

const routes: Routes = 
[
{ path: '', canActivate: [checkAdminGuard], component: AdminComponent },
{ path: 'admin', canActivate: [checkAdminGuard], component: AdminComponent },
{ path: "user", canActivate: [checkAdminGuard], component: UserComponent},
{ path: "product", canActivate: [checkAdminGuard], component: ProductComponent},
{ path: "product/details/:id", canActivate: [checkAdminGuard], component: ProductDetailsAdmin},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
