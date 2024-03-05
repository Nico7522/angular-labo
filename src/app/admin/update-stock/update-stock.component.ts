import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalService } from '../../services/modal.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-update-stock',
  templateUrl: './update-stock.component.html',
  styleUrl: './update-stock.component.scss'
})
export class UpdateStockComponent {

  stock!: number;

  constructor(private _productService: ProductService, private dialogRef: MatDialogRef<UpdateStockComponent>, @Inject(MAT_DIALOG_DATA) public data: {sizeId: number, productId: number}){}

  saveChange(){
    this._productService.updateStock(this.data.sizeId, this.data.productId, this.stock).subscribe(res => console.log(res));
    this.dialogRef.close();

  }
  close() {
    this.dialogRef.close();
  }
}
