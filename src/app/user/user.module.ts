import { NgModule } from '@angular/core';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfilComponent } from './profil/profil.component';
import { MaterialModule } from '../shared/material/material.module';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { ExpansionPanelComponent } from '../components/expansion-panel/expansion-panel.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AdressDetailsComponent } from './adress-details/adress-details.component';
import { FrenchDatePipe } from '../pipes/french-date.pipe';
import { OrderDetailsComponent } from './order-details/order-details.component';


@NgModule({
    declarations: [
        UserComponent,
        LoginComponent,
        RegisterComponent,
        ProfilComponent,
        AdressDetailsComponent,
        OrderDetailsComponent,
    ],
    imports: [
        UserRoutingModule,
        SharedModule,
        MaterialModule,
        ExpansionPanelComponent,
        CommonModule,
    ]
})
export class UserModule { }
