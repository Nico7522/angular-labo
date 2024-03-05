import { ComponentType } from '@angular/cdk/portal';
import { Injectable, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

   constructor(private _dialog: MatDialog) {}
 
    private _$canDeleteAddress = new Subject<boolean>();
    $canDeleteAddress = this._$canDeleteAddress.asObservable();
    canDelete(canDelete: boolean) {
      this._$canDeleteAddress.next(canDelete);
      this.closeModal();
    }


    openModal(component: ComponentType<unknown> ,enterAnimationDuration: string, exitAnimationDuration: string, width: string = "300px", height: string = "350px", data?: any): void {
      const dialog = this._dialog.open(component, {
      width: width,
      height: height,
      hasBackdrop: false,
      enterAnimationDuration,
      exitAnimationDuration,
      data: data
    });

  

   
   

  
  }
  closeModal(){
    this._dialog.closeAll();
    
  }
}
