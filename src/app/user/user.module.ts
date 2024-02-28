import { NgModule } from '@angular/core';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfilComponent } from './profil/profil.component';
import { MaterialModule } from '../shared/material/material.module';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';

import { AdressDetailsComponent } from './adress-details/adress-details.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateAdressComponent } from './create-adress/create-adress.component';


@NgModule({
    declarations: [
        UserComponent,
        LoginComponent,
        RegisterComponent,
        ProfilComponent,
        AdressDetailsComponent,
        OrderDetailsComponent,
        EditUserComponent,
        CreateAdressComponent,
    ],
    imports: [
        UserRoutingModule,
        MaterialModule,
        ReactiveFormsModule,
        CommonModule,
        SharedModule
    ],
    
})
export class UserModule { }
