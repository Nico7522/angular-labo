import { NgModule } from '@angular/core';
import { NavComponent } from './nav/nav.component';
import { MaterialModule } from './material/material.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserCardComponent } from './user-card/user-card.component';
import { FrenchDatePipe } from '../pipes/french-date.pipe';

@NgModule({
  declarations: [NavComponent, UserCardComponent, FrenchDatePipe],
  imports: [MaterialModule, RouterModule, CommonModule],
  exports: [NavComponent, MaterialModule, UserCardComponent, FrenchDatePipe]


})
export class SharedModule {}
