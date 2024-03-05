import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SizeForm } from '../../../models/size.model';
import { ModalService } from '../../../services/modal.service';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-stock-select-modal',
  templateUrl: './stock-select-modal.component.html',
  styleUrl: './stock-select-modal.component.scss'
})
export class StockSelectModalComponent implements OnInit {
  stock = new FormControl('');
  constructor( @Inject(MAT_DIALOG_DATA) public data: SizeForm, private _modalService: ModalService, private _productService: ProductService){}
  ngOnInit(): void {
    console.log(this.data);
    
  }

  handleStock() {
    const form: SizeForm = {
      sizeId: this.data.sizeId,
      productId: this.data.productId,
      stock: this.stock.value as any as number,
    }
    this._productService.setSizeForm(form);
    this._modalService.closeModal();
  }
}
