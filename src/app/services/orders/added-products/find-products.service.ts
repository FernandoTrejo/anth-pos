import { Injectable } from '@angular/core';
import { db } from 'src/app/storage/db';
import { ProductoOrden } from 'src/app/storage/schema/productos/productos_orden';

@Injectable({
  providedIn: 'root'
})
export class FindProductsService {

  constructor() { }

  async allByOrderCode(codigo: string) {
    const filter = {
      codigo_orden: codigo
    };
    const results = await db.productosOrden.where(filter).toArray();
    return results;
  }

  async countAllByOrderCode(codigo: string) {
    const all = await this.allByOrderCode(codigo);
    return all.length;
  }

  async isProductAlreadyInOrder(codigoOrden: string, codigoProducto: string) : Promise<boolean> {
    try {
      const filter = {
        codigo_orden: codigoOrden,
        codigo_producto: codigoProducto
      };
      const results = await db.productosOrden.where(filter).toArray();
      return results.length > 0;
    } catch (error) {
      return false;
    }
  }

  async findProductInOrder(codigoOrden: string, codigoProducto: string) : Promise<ProductoOrden | null>{
    try {
      const filter = {
        codigo_orden: codigoOrden,
        codigo_producto: codigoProducto
      };
      const results = await db.productosOrden.where(filter).toArray();
      if(results.length > 0){
        return results[0];
      }
      return null
    } catch (error) {
      return null;
    }
  }
}
