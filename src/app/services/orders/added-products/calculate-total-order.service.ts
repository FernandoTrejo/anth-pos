import { Injectable } from '@angular/core';
import { db } from 'src/app/storage/db';

@Injectable({
  providedIn: 'root'
})
export class CalculateTotalOrderService {

  constructor() { }

  async calculate(orderCode : string){
    const filter = {
      codigo_orden: orderCode
    };
    const productos = await db.productosOrden.where(filter).toArray();

    let totalOrden : number = 0;
    for(let producto of productos){
      totalOrden += Number(producto.subtotal);
    }

    return totalOrden.toFixed(2);
  }
}
