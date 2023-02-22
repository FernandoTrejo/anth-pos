import { Injectable } from '@angular/core';
import { db } from 'src/app/storage/db';
import { Pago } from 'src/app/storage/schema/pagos/pagos';
import { Message, MessageType } from 'src/app/utilities/messages';
import { CalculateTotalOrderService } from '../orders/added-products/calculate-total-order.service';

@Injectable({
  providedIn: 'root'
})
export class StorePaymentInOrderService {

  constructor(private totalCalculator : CalculateTotalOrderService) { }

  async store(payment : Pago) : Promise<Message>{
    if(await this.totalIsGreaterThanZero(payment.codigo_orden)){
      const id = await db.pagosOrden.add(payment);
      return {
        title: 'El pago se ha registrado',
        type: MessageType.success
      };
    }

    return {
      title: 'Ha ocurrido un error al registrar el pago',
      type: MessageType.error
    };
  }

  async totalIsGreaterThanZero(orderCode : string){
    const total = await this.totalCalculator.calculate(orderCode);
    return Number(total) > 0;
  }
}
