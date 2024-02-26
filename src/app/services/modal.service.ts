import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

   constructor(private _dialog: MatDialog) {}

  openModal(component: ComponentType<unknown> ,enterAnimationDuration: string, exitAnimationDuration: string): void {
    this._dialog.open(component, {
      width: '300px',
      height: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
  closeModal(){
    this._dialog.closeAll();
  }
}
