import { Injectable } from '@angular/core';
import { db } from 'src/app/storage/db';
import { ProductoOrden } from 'src/app/storage/schema/productos/productos_orden';
import { Message, Messages, MessageType } from 'src/app/utilities/messages';

@Injectable({
  providedIn: 'root'
})
export class StoreProductsService {

  constructor() { }

  async store(productOrder: ProductoOrden): Promise<Message> {
    try {
      const id = await db.productosOrden.add(productOrder);
      return {
        title: 'El producto se ha agregado correctamente',
        type: MessageType.success
      };
    } catch (error) {
      return {
        title: 'Ha ocurrido un error al agregar el producto',
        type: MessageType.error
      };
    }
  }
}
