import { Injectable } from '@angular/core';
import { db } from 'src/app/storage/db';
import { CorteDiario } from 'src/app/storage/schema/cortes/cortes';
import { CortesStatus } from 'src/app/utilities/cortes_status';
import { v4 } from 'uuid';
import { AuthService } from '../../auth/auth.service';
import { FindActiveCorteMensualService } from '../corte-mensual/find-active-corte-mensual.service';
import { FindActiveCorteDiarioService } from './find-active-corte-diario.service';

@Injectable({
  providedIn: 'root'
})
export class OpenCorteDiarioService {

  constructor(
    private ActiveCorteMensual: FindActiveCorteMensualService, 
    private ActiveCorteDiario: FindActiveCorteDiarioService,
    private auth : AuthService) { }

  async open() {
    const corteDiario = await this.ActiveCorteDiario.find();
    if (!corteDiario) {
      const corteMensual = await this.ActiveCorteMensual.find();
      if (!corteMensual) {
        return null;
      }

      const user = await this.auth.user();
      if (user == undefined || user == null) {
        return null;
      }

      const corte: CorteDiario = {
        codigo: 'cd-' + v4(),
        numero_corte: '',
        codigo_corte_mensual: corteMensual.codigo,
        fecha_inicio: new Date(),
        status: CortesStatus.Active,
        usuario_id: (user.id) ? user.id : 0
      };

      const id = await db.cortesDiarios.add(corte);
      return id;
    }

    return null;
  }
}
