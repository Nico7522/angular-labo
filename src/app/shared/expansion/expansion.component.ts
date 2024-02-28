import { Component, Input } from '@angular/core';
import { Order } from '../../models/order.model';
import { api } from '../../../../environement/environement';

@Component({
  selector: 'app-expansion',
  templateUrl: './expansion.component.html',
  styleUrl: './expansion.component.scss'
})
export class ExpansionComponent {
  @Input() order!: Order;
  imageUrl: string = api.img_url;
}