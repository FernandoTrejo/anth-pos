import { Injectable } from '@angular/core';
import { db } from 'src/app/storage/db';
import { TipoTransacciones } from 'src/app/utilities/tipo_transacciones';
import { FindActiveCorteParcialService } from '../cortes/corte-parcial/find-active-corte-parcial.service';

@Injectable({
  providedIn: 'root'
})
export class FindDevolucionesCorteXService {

  constructor(private xFinder : FindActiveCorteParcialService) { }

  async find(){
    const corteParcial = await this.xFinder.find();
    if(!corteParcial){
      return [];
    }
    const devoluciones = await db.transacciones.filter(transaccion => {
      return transaccion.tipo_transaccion == TipoTransacciones.Devolucion && transaccion.corte_parcial == corteParcial.codigo;
    });

    return devoluciones;
  }
}
