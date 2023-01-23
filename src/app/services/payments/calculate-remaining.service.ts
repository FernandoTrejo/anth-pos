import { Injectable } from '@angular/core';
import { CalculateTotalOrderService } from '../orders/added-products/calculate-total-order.service';
import { CalculateTotalReceivedService } from './calculate-total-received.service';

@Injectable({
  providedIn: 'root'
})
export class CalculateRemainingService {

  constructor(private totalCalculator : CalculateTotalOrderService, private totalReceived : CalculateTotalReceivedService) { }

  async calculate(orderCode : string){
    const total = await this.totalCalculator.calculate(orderCode);
    const received = await this.totalReceived.calculate(orderCode);

    const difference = Number(total) - Number(received);
    if(Number(difference) < 0){
      return 0;
    }

    return Number(difference).toFixed(2);
  }
}
