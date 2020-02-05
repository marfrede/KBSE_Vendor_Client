import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weight-format'
})
export class WeightPipe implements PipeTransform {

  transform(value: number): string {
    return (value < 1)? value * 1000 + 'g' : value + 'kg';
  }

}
