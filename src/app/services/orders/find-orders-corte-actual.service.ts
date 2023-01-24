import { Injectable } from '@angular/core';
import { db } from 'src/app/storage/db';
import { FindActiveCorteParcialService } from '../cortes/corte-parcial/find-active-corte-parcial.service';

@Injectable({
  providedIn: 'root'
})
export class FindOrdersCorteActualService {

  constructor(private activeCorte : FindActiveCorteParcialService) { }

  async find(type : string){
    const corteParcial = await this.activeCorte.find();

    if(corteParcial){
      const orders = await db.transacciones.where({
        corte_parcial: corteParcial.codigo,
        tipo_transaccion: type
      }).toArray();
      return orders;
    }

    return [];
  }
}
