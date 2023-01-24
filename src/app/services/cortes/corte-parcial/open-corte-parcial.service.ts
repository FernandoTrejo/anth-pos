import { Injectable } from '@angular/core';
import { db } from 'src/app/storage/db';
import { CorteParcial } from 'src/app/storage/schema/cortes/cortes';
import { CortesStatus } from 'src/app/utilities/cortes_status';
import { v4 } from 'uuid';
import { FindActiveCorteDiarioService } from '../corte-diario/find-active-corte-diario.service';

@Injectable({
  providedIn: 'root'
})
export class OpenCorteParcialService {

  constructor(private ActiveCorteDiario: FindActiveCorteDiarioService) { }

  async open() {
    const corteDiario = await this.ActiveCorteDiario.find();
    if (corteDiario) {
      const corte: CorteParcial = {
        codigo: 'cp-' + v4(),
        numero_corte: '',
        codigo_corte_diario: corteDiario.codigo,
        fecha_inicio: new Date(),
        status: CortesStatus.Active
      };

      const id = await db.cortesParciales.add(corte);
      return id;
    }

    return null;
  }
}
