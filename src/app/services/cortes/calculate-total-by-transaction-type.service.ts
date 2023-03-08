import { Injectable } from '@angular/core';
import { db } from 'src/app/storage/db';

@Injectable({
  providedIn: 'root'
})
export class CalculateTotalByTransactionTypeService {

  constructor() { }

  calculate(type : string, corte_codigo : string){
    const transacciones = db.transacciones.where({
      tipo_transaccion: type,
      corte_parcial: corte_codigo
    }).toArray();
    
  }
}
