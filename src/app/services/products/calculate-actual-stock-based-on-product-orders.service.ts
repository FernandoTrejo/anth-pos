import { Injectable } from '@angular/core';
import { db } from 'src/app/storage/db';
import { Message, MessageType } from 'src/app/utilities/messages';

@Injectable({
  providedIn: 'root'
})
export class CalculateActualStockBasedOnProductOrdersService {

  constructor() { }

  async calculate(prodCode: string): Promise<Message> {
    const response = await db.transaction('rw', db.productos, db.productosOrden, async () => {
      const filter = { codigo_producto: prodCode };
      const productOrders = await db.productosOrden.where(filter).toArray();
      let quantity = 0;
      for (let prod of productOrders) {
        quantity += Number(prod.cantidad);
      }

      const productList = await db.productos.where({ codigo: prodCode }).toArray();
      const product = (productList.length > 0) ? productList[0] : null;
      if (!product) {
        return {
          title: 'No existe el producto',
          type: MessageType.error
        };
      }

      const initialStock = Number(product.stock_inicial);
      const actualStock = Number(initialStock) - quantity;

      if(actualStock < 0){
        return {
          title: 'Stock insuficiente',
          type: MessageType.error
        };
      }
      //actualizar producto
      await db.productos.where({ codigo: prodCode }).modify({ existencias: actualStock });
      return {
        title: '',
        type: MessageType.success
      }
    }).catch(err => {
      console.log(err);
      return {
        title: 'Ha ocurrido un error inesperado',
        type: MessageType.error
      };
    });

    return response;
  }
}
