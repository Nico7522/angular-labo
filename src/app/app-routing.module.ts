import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { checkAdminGuard } from './guards/check-admin.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
 },
  { path: "home", component: HomeComponent},
  { path : "user", loadChildren : () => import("./user/user.module").then(m => m.UserModule)},
  { path: 'products', loadChildren: () => import('./product/product.module').then(m => m.ProductModule) },
  { path: 'admin', canActivate: [checkAdminGuard], loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  ];
  // { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
