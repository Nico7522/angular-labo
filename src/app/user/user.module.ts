import { NgModule } from '@angular/core';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfilComponent } from './profil/profil.component';
import { MaterialModule } from '../shared/material/material.module';


@NgModule({
  declarations: [
    UserComponent,
    LoginComponent,
    RegisterComponent,
    ProfilComponent
  ],
  imports: [
    UserRoutingModule,
    MaterialModule,
  ]
})
export class UserModule { }
