import { NgModule } from '@angular/core';
import { NavComponent } from './nav/nav.component';
import { MaterialModule } from './material/material.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NavComponent],
  imports: [MaterialModule, RouterModule],
  exports: [NavComponent],
})
export class SharedModule {}
