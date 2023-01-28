import { Injectable } from '@angular/core';
import { db } from 'src/app/storage/db';
import { Transacciones } from 'src/app/storage/schema/transacciones/transacciones';

@Injectable({
  providedIn: 'root'
})
export class UpdateOrderService {

  constructor() { }

  async update(code : string, transaccion : Transacciones){
    let orders = await db.transacciones.where({
      codigo: code
    }).toArray();
    if(orders.length == 0){
      return null;
    }
    const order = orders[0];
    if(order.id){
      await db.transacciones.update(order.id, transaccion);
    }
    
    return null;
  }
}
