import { Injectable } from '@angular/core';
import { db } from 'src/app/storage/db';

@Injectable({
  providedIn: 'root'
})
export class FindAttachedClientToStoreService {
//attach to order
  constructor() { }

  async find(codigoOrden : string){
    const cliente = await db.clientesOrden.where({codigo_orden: codigoOrden}).first();
    return cliente;
  }
}
