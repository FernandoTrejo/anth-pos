import { Injectable } from '@angular/core';
import { db } from 'src/app/storage/db';
import { Message, MessageType } from 'src/app/utilities/messages';
import { CalculateActualStockBasedOnProductOrdersService } from '../../products/calculate-actual-stock-based-on-product-orders.service';

@Injectable({
  providedIn: 'root'
})
export class DeleteProductsService {

  constructor(private actualStock : CalculateActualStockBasedOnProductOrdersService) { }

  async delete(orderProductId : number, prodCode : string) : Promise<Message>{
    const response  = await db.transaction('rw', db.productos, db.productosOrden, async () => {
      await db.productosOrden.delete(orderProductId);
      await this.actualStock.calculate(prodCode);

      return {
        title: 'Producto eliminado',
        type: MessageType.success
      }
    }).catch(err => {
      console.log(err);
      return {
        title: 'Ha ocurrido un error inesperado',
        type: MessageType.error
      }
    });

    return response;
  }
}
