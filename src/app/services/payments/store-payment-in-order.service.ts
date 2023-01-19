import { Injectable } from '@angular/core';
import { db } from 'src/app/storage/db';
import { Pago } from 'src/app/storage/schema/pagos/pagos';

@Injectable({
  providedIn: 'root'
})
export class StorePaymentInOrderService {

  constructor() { }

  async store(payment : Pago){
    const id = await db.pagosOrden.add(payment);
    return id;
  }
}
