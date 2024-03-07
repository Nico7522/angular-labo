import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-set-stock',
  templateUrl: './set-stock.component.html',
  styleUrl: './set-stock.component.scss'
})
export class SetStockComponent {

  stock!: number;

  constructor(private _dialogRef: MatDialogRef<SetStockComponent>){}

  validate(){
    this._dialogRef.close(this.stock);
  }

  close(){
    this._dialogRef.close();
  }
}
