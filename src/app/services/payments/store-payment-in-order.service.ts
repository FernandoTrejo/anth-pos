import { Injectable } from '@angular/core';
import { db } from 'src/app/storage/db';
import { Pago } from 'src/app/storage/schema/pagos/pagos';
import { CalculateTotalOrderService } from '../orders/added-products/calculate-total-order.service';

@Injectable({
  providedIn: 'root'
})
export class StorePaymentInOrderService {

  constructor(private totalCalculator : CalculateTotalOrderService) { }

  async store(payment : Pago){
    if(await this.totalIsGreaterThanZero(payment.codigo_orden)){
      const id = await db.pagosOrden.add(payment);
      return id;
    }

    return null;
  }

  async totalIsGreaterThanZero(orderCode : string){
    const total = await this.totalCalculator.calculate(orderCode);
    return Number(total) > 0;
  }
}
