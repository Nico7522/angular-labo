import { NgModule } from '@angular/core';
import { NavComponent } from './nav/nav.component';
import { MaterialModule } from './material/material.module';
import { RouterModule } from '@angular/router';
import { UserCardComponent } from './user-card/user-card.component';
import { FrenchDatePipe } from '../pipes/french-date.pipe';
import { ExpansionComponent } from './expansion/expansion.component';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';

@NgModule({
  declarations: [NavComponent, UserCardComponent, FrenchDatePipe, ExpansionComponent, CartComponent],
  imports: [RouterModule, MaterialModule, CommonModule],
  exports: [NavComponent, UserCardComponent, FrenchDatePipe, ExpansionComponent],


})
export class SharedModule {}
