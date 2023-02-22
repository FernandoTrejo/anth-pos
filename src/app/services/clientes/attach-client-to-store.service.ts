import { Injectable } from '@angular/core';
import { db } from 'src/app/storage/db';
import { ClienteOrden } from 'src/app/storage/schema/clientes/clientes';
import { Message, MessageType } from 'src/app/utilities/messages';

@Injectable({
  providedIn: 'root'
})
export class AttachClientToStoreService {

  constructor() { }

  async attach(codigo_cliente: string, codigo_orden: string) : Promise<Message> {


    const response = await db.transaction('rw', db.clientes, db.clientesOrden, async () => {
      await db.clientesOrden.where({codigo_orden: codigo_orden}).delete();
      const cliente = await db.clientes.where({ codigo: codigo_cliente }).first();
      if (cliente == undefined) {
        return {
          title: 'El cliente no existe.',
          type: MessageType.error
        };
      }

      const clienteOrden: ClienteOrden = {
        codigo_cliente: cliente.codigo,
        codigo_orden: codigo_orden,
        nombre_cliente: cliente.nombre_cliente
      }
      await db.clientesOrden.add(clienteOrden);
      return {
        title: 'El cliente se ha enlazado a la orden actual',
        type: MessageType.success
      };
    }).catch(err => {
      console.log(err);
      return {
        title: 'Ha ocurrido un error al enlazar el cliente con la orden actual.',
        type: MessageType.error
      };
    })

    return response;
  }
}
