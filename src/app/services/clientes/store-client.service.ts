import { Injectable } from '@angular/core';
import { db } from 'src/app/storage/db';
import { Cliente } from 'src/app/storage/schema/clientes/clientes';
import { Message, MessageType } from 'src/app/utilities/messages';

@Injectable({
  providedIn: 'root'
})
export class StoreClientService {

  constructor() { }

  async store(cliente : Cliente) : Promise<Message>{
    try {
      await db.clientes.add(cliente);
      return {
        title: 'El cliente se ha guardado',
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
