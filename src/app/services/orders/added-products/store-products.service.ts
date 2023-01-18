import { Injectable } from '@angular/core';
import { db } from 'src/app/storage/db';
import { ProductoOrden } from 'src/app/storage/schema/productos/productos_orden';

@Injectable({
  providedIn: 'root'
})
export class StoreProductsService {

  constructor() { }

  async store(productOrder : ProductoOrden){
    const id = await db.productosOrden.add(productOrder);
    return id;
  }
}
