import { Injectable } from '@angular/core';
import { db } from 'src/app/storage/db';

@Injectable({
  providedIn: 'root'
})
export class DeleteProductsService {

  constructor() { }

  async delete(orderProductId : number){
    await db.productosOrden.delete(orderProductId);
  }
}
