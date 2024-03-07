import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrl: './confirm-delete.component.scss'
})
export class ConfirmDeleteComponent {

  confirm!: boolean;

  constructor(private _matDialog: MatDialogRef<ConfirmDeleteComponent>){}
  handleResponse(confirmation: boolean) {
    this._matDialog.close(confirmation)
  }
}
