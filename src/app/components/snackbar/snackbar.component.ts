import { Component, Inject, inject } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA, SimpleSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.scss'
})
export class SnackbarComponent {
  snackBarRef!: MatSnackBarRef<SimpleSnackBar>
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string) {
  }
}
