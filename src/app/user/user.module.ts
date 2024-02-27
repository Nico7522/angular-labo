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


@NgModule({
  declarations: [
    UserComponent,
    LoginComponent,
    RegisterComponent,
    ProfilComponent,

  ],
  imports: [
    UserRoutingModule,
    SharedModule,
    MaterialModule,
    ExpansionPanelComponent
  ],


})
export class UserModule { }
