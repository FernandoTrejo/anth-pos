import { Injectable } from '@angular/core';
import { db } from 'src/app/storage/db';
import { Message, MessageType } from 'src/app/utilities/messages';

@Injectable({
  providedIn: 'root'
})
export class DeleteOrderDataService {

  constructor() { }

  async removeAll(code : string) : Promise<Message>{
    const response = await db.transaction('rw', db.productosOrden, db.pagosOrden, db.productos, db.clientesOrden, async () => {
      await db.pagosOrden.where({'codigo_orden' : code}).delete();
      const productosAgregados = await db.productosOrden.where({'codigo_orden' : code}).toArray();
      await Promise.all(productosAgregados.map(async (producto) => {
        const productos = await db.productos.where({'codigo' : producto.codigo_producto}).toArray();
        if(productos.length > 0){
          const prod = productos[0];
          await db.productos.update((prod.id) ? prod.id : 0, {existencias: Number(prod.existencias) + Number(producto.cantidad)})
        }
      }));
      await db.productosOrden.where({'codigo_orden' : code}).delete();
      await db.clientesOrden.where({codigo_orden: code}).delete();

      return {
        title: 'La orden se ha eliminado',
        type: MessageType.success
      };
    }).catch(err => {
      console.log(err);

      return {
        title: 'Ha ocurrido un error',
        type: MessageType.error
      };
    });

    return response;
  }
}
