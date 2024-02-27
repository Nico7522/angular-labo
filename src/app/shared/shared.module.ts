import { NgModule } from '@angular/core';
import { NavComponent } from './nav/nav.component';
import { MaterialModule } from './material/material.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserCardComponent } from './user-card/user-card.component';

@NgModule({
  declarations: [NavComponent, UserCardComponent],
  imports: [MaterialModule, RouterModule, CommonModule],
  exports: [NavComponent, MaterialModule, UserCardComponent]


})
export class SharedModule {}
