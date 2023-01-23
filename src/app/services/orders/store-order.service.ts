import { Injectable } from '@angular/core';
import { db } from 'src/app/storage/db';
import { Transacciones } from 'src/app/storage/schema/transacciones/transacciones';

@Injectable({
  providedIn: 'root'
})
export class StoreOrderService {

  constructor() { }

  async store(){

  }

  async process(orden : Transacciones){
    const id = await db.transacciones.add(orden);
    return id;
  }
}
