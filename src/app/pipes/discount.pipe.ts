import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discount'
})
export class DiscountPipe implements PipeTransform {

  transform(value: number): number {
    let price: number = Number(value.toString().substring(2)) * 10;
    return price;
  }

}
