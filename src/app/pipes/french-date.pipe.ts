import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'frenchDate'
})
export class FrenchDatePipe implements PipeTransform {

  transform(value: Date): string {
    const date: string = new Date(value).toLocaleDateString('fr', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    return date;
  }
  }

