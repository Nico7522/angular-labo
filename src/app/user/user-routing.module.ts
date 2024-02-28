import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdressDetailsComponent } from './adress-details/adress-details.component';
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
  { path: 'profil', component: ProfilComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'adress/:id', component: AdressDetailsComponent },
  { path: 'edit/:id', component: EditUserComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
