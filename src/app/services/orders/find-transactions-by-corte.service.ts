import { Injectable } from '@angular/core';
import { db } from 'src/app/storage/db';

@Injectable({
  providedIn: 'root'
})
export class FindTransactionsByCorteService {

  constructor() { }

  async getByCorteParcial(code : string){
    const transacciones = await db.transacciones.where({
      corte_parcial: code
    }).toArray();

    return transacciones;
  }
}
