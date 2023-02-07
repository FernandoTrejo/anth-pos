import { Injectable } from '@angular/core';
import { db } from 'src/app/storage/db';
import { MessageType } from 'src/app/utilities/messages';
import { CalculateActualStockBasedOnProductOrdersService } from '../../products/calculate-actual-stock-based-on-product-orders.service';

@Injectable({
  providedIn: 'root'
})
export class ChangeQuantityService {

  constructor(private actualStockService : CalculateActualStockBasedOnProductOrdersService) { }

  async change(prodCode : string, id : number, quantity: number, subtotal: number){

    const response = await db.transaction('rw', db.productosOrden, db.productos, async () => {
      
      // actualizar cantidad en orden
      await db.productosOrden.update(id, {
        cantidad: quantity,
        subtotal: subtotal
      });

      const response = await this.actualStockService.calculate(prodCode);
      if(response.type == MessageType.error){
        throw new Error('Stock insuficiente');
      }

      return {
        title: 'Se ha modificado la cantidad correctamente',
        type: MessageType.success
      };
    }).catch(err => {
      console.log(err);
      return {
        title: 'Ha ocurrido un error al modificar la cantidad',
        type: MessageType.error
      };
    });

    return response;
  }
}
