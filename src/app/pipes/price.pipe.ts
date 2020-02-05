import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price-format'
})
export class PricePipe implements PipeTransform {

  transform(value: number): string {
    return (value < 1)? value * 100 + ' Cent' : value + ' €';
  }

}
