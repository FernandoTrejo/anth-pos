import { Injectable } from '@angular/core';
import { db } from 'src/app/storage/db';
import { ProductoOrden } from 'src/app/storage/schema/productos/productos_orden';
import { Transacciones } from 'src/app/storage/schema/transacciones/transacciones';
import { Message, MessageType } from 'src/app/utilities/messages';

@Injectable({
  providedIn: 'root'
})
export class StoreDevolucionService {

  constructor() { }

  async store(devolucion : Transacciones, productosDevolucion : ProductoOrden[]) : Promise<Message>{
    const response = await db.transaction('rw', db.productosOrden, db.transacciones, db.productos, async () => {
      await db.productosOrden.bulkAdd(productosDevolucion);
      await db.transacciones.add(devolucion);
      await Promise.all(productosDevolucion.map(async productoDevolucion => {
        await db.productos.toCollection().modify(producto => {
          if(producto.codigo == productoDevolucion.codigo_producto){
            producto.existencias = Number(producto.existencias) - Number(productoDevolucion.cantidad);
          }
        });
      }));

      return {
        title: 'La devolucion se ha guardado',
        type: MessageType.success
      }
    }).catch(err => {
      console.log(err);
      return {
        title: 'Ha ocurrido un error al guardar la devolucion',
        type: MessageType.error
      }
    });

    return response;
  }
}
