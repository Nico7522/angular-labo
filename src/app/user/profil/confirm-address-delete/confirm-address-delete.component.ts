import { Component } from '@angular/core';
import { ModalService } from '../../../services/modal.service';

@Component({
  selector: 'app-confirm-address-delete',
  templateUrl: './confirm-address-delete.component.html',
  styleUrl: './confirm-address-delete.component.scss'
})
export class ConfirmAddressDeleteComponent {
  canDelete!: boolean;
  constructor(private _modalService: ModalService){}
  close(canDelete: boolean) {
    this._modalService.canDelete(canDelete);

  }
}
