import { Injectable } from '@angular/core';
import { db } from 'src/app/storage/db';
import { CorteMensual } from 'src/app/storage/schema/cortes/cortes';
import { CortesStatus } from 'src/app/utilities/cortes_status';
import { v4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class OpenCorteMensualService {

  constructor() { }

  async open() {
    const corteMensual: CorteMensual = {
      codigo: 'cm-' + v4(),
      numero_corte: '',
      fecha_inicio: new Date(),
      status: CortesStatus.Active
    };

    const id = await db.cortesMensuales.add(corteMensual);
    return id;
  }
}
