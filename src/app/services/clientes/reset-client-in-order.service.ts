import { Injectable } from '@angular/core';
import { db } from 'src/app/storage/db';
import { Message, MessageType } from 'src/app/utilities/messages';

@Injectable({
  providedIn: 'root'
})
export class ResetClientInOrderService {

  constructor() { }

  async reset(codigoOrden: string): Promise<Message> {
    try {
      await db.clientesOrden.where({ codigo_orden: codigoOrden }).delete();
      return {
        title: 'Cliente reseteado',
        type: MessageType.success
      }
    } catch (error) {
      console.log(error);
      return {
        title: 'Ha ocurrido un error',
        type: MessageType.error
      }
    }
  }
}
