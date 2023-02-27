import { Injectable } from '@angular/core';
import { db } from 'src/app/storage/db';
import { Transacciones } from 'src/app/storage/schema/transacciones/transacciones';
import { Message, MessageType } from 'src/app/utilities/messages';

@Injectable({
  providedIn: 'root'
})
export class UpdateOrderService {

  constructor() { }

  async update(code : string, transaccion : Transacciones) : Promise<Message>{
    try {
      let orders = await db.transacciones.where({
        codigo: code
      }).toArray();
      if(orders.length == 0){
        return {
          title: 'No existe ninguna orden con este codigo',
          type: MessageType.error
        };
      }
      const order = orders[0];
      if(order.id){
        await db.transacciones.update(order.id, transaccion);
        return {
          title: 'La orden se ha actualizado con exito',
          type: MessageType.success
        };
      }
      console.log('order id undefined');
      return {
        title: 'Ha ocurrido un error inesperado',
        type: MessageType.error
      };
    } catch (error) {
      console.log(error);
      return {
        title: 'Ha ocurrido un error inesperado',
        type: MessageType.error
      };
    }
  }
}
