import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { EditAddressComponent } from './edit-address/edit-address.component';
import { EditUserComponent } from './edit-user/edit-user.component';

import { LoginComponent } from './login/login.component';
import { ProfilComponent } from './profil/profil.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: UserComponent,
  // },
  { path: 'profil', canActivate: [AuthGuard], component: ProfilComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'edit/adress/:id', canActivate: [AuthGuard], component: EditAddressComponent },
  { path: 'edit/:id', canActivate: [AuthGuard], component: EditUserComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
