import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatDialogActions,
  MatDialogContent,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTableModule} from '@angular/material/table';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTabsModule} from '@angular/material/tabs';
import {MatRadioModule} from '@angular/material/radio';

const material = [
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogActions,
  MatDialogContent,
  MatSidenavModule,
  MatExpansionModule,
  FlexLayoutModule,
  MatCardModule,
  MatListModule,
  MatTableModule,
  MatAutocompleteModule,
  MatGridListModule,
  MatTabsModule,
  MatSelectModule,
  MatRadioModule,
  MatSliderModule
]

@NgModule({
  imports: [
   material
  ],
  exports: [
    material
  ],
  // providers: [
    
  //     provideAnimationsAsync(),
  //   { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { autoFocus: true }, },
  // ],
})
export class MaterialModule {}
