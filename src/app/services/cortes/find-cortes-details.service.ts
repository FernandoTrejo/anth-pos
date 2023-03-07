import { Injectable } from '@angular/core';
import { db } from 'src/app/storage/db';
import { FindTotalByTypeService } from '../payments/find-total-by-type.service';

@Injectable({
  providedIn: 'root'
})
export class FindCortesDetailsService {

  constructor(private calculator : FindTotalByTypeService) { }

  async details(code : string){
    const registros = await db.cortesTipoPagos.where({
      codigo_corte: code
    }).toArray();

    registros.map(async registro => {
      registro.total_calculado = await this.calculator.calculateX(registro.codigo_tipo_pago, code);
    });

    return registros;
  }
}
