import { Pipe, PipeTransform } from '@angular/core';
import { Money } from '../utilities/money';

@Pipe({
  name: 'formatMoney'
})
export class FormatMoneyPipe implements PipeTransform {

  transform(amount: number): string {
    return (new Money(amount)).toString();
  }

}
