import { Injectable } from '@angular/core';
import { db } from 'src/app/storage/db';
import { Message, MessageType } from 'src/app/utilities/messages';
import { FindActiveCorteParcialService } from '../cortes/corte-parcial/find-active-corte-parcial.service';

@Injectable({
  providedIn: 'root'
})
export class CalculateActualStockBasedOnProductOrdersService {

  constructor(private xFinder : FindActiveCorteParcialService) { }

  async calculate(prodCode: string): Promise<Message> {
    const response = await db.transaction('rw', db.productos, db.productosOrden, db.cortesParciales, async () => {
      const corteX = await this.xFinder.find();
      if (!corteX) {
        console.log('es el corte x el error');
        return {
          title: 'No existe una sesion x',
          type: MessageType.error
        };
      }

      const filter = { codigo_producto: prodCode, codigo_corte_x: corteX.codigo };
      
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
      
      console.log(initialStock, actualStock);

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
