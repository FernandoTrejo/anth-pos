import { Injectable } from '@angular/core';
import { db } from 'src/app/storage/db';

@Injectable({
  providedIn: 'root'
})
export class FindPaymentsService {

  constructor() { }

  async getPaymentsByOrderCode(orderCode : string){
    const pagos = await db.pagosOrden.where({
      codigo_orden: orderCode
    }).toArray();

    return pagos;
  }
}
