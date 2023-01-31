import { Injectable } from '@angular/core';
import { db } from 'src/app/storage/db';
import { CorteMensual } from 'src/app/storage/schema/cortes/cortes';
import { CortesStatus } from 'src/app/utilities/cortes_status';
import { v4 } from 'uuid';
import { FindActiveCorteMensualService } from './find-active-corte-mensual.service';

@Injectable({
  providedIn: 'root'
})
export class OpenCorteMensualService {

  constructor(private ActiveCorteMensual: FindActiveCorteMensualService) { }

  async open() {
    const mensual = await this.ActiveCorteMensual.find();
    if(!mensual){
      const corteMensual: CorteMensual = {
        codigo: 'cm-' + v4(),
        numero_corte: '',
        fecha_inicio: new Date(),
        status: CortesStatus.Active
      };
  
      const id = await db.cortesMensuales.add(corteMensual);
      return id;
    }

    return 0;

  }
}
