import { NgModule } from '@angular/core';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfilComponent } from './profil/profil.component';
import { MaterialModule } from '../shared/material/material.module';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';

import { OrderDetailsComponent } from './order-details/order-details.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateAdressComponent } from './create-adress/create-adress.component';
import { EditAddressComponent } from './edit-address/edit-address.component';
import { ConfirmAddressDeleteComponent } from './profil/confirm-address-delete/confirm-address-delete.component';


@NgModule({
    declarations: [
        UserComponent,
        LoginComponent,
        RegisterComponent,
        ProfilComponent,
        OrderDetailsComponent,
        EditUserComponent,
        CreateAdressComponent,
        EditAddressComponent,
        ConfirmAddressDeleteComponent,
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
