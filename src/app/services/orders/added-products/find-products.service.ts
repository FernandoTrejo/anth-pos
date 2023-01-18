import { Injectable } from '@angular/core';
import { db } from 'src/app/storage/db';

@Injectable({
  providedIn: 'root'
})
export class FindProductsService {

  constructor() { }

  async allByOrderCode(codigo : string){
    const filter = {
      codigo_orden: codigo
    };
    const results = await db.productosOrden.where(filter).toArray();
    return results;
  }
}
