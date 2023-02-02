import { Injectable } from '@angular/core';
import { db } from 'src/app/storage/db';

@Injectable({
  providedIn: 'root'
})
export class ChangeQuantityService {

  constructor() { }

  async change(id : number, quantity: number, subtotal: number){
    await db.productosOrden.update(id, {
      cantidad: quantity,
      subtotal: subtotal
    })
  }
}
