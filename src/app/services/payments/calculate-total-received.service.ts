import { Injectable } from '@angular/core';
import { FindPaymentsService } from './find-payments.service';

@Injectable({
  providedIn: 'root'
})
export class CalculateTotalReceivedService {

  constructor(private findPaymentsService : FindPaymentsService) { }

  async calculate(orderCode : string){
    const payments = await this.findPaymentsService.getPaymentsByOrderCode(orderCode);

    let total : number = 0;
    for(let payment of payments){
      total += Number(payment.recibido);
    }

    return total.toFixed(2);
  }

}
