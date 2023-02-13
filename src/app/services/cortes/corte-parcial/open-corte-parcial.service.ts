import { Injectable } from '@angular/core';
import { db } from 'src/app/storage/db';
import { CorteParcial } from 'src/app/storage/schema/cortes/cortes';
import { CortesStatus } from 'src/app/utilities/cortes_status';
import { v4 } from 'uuid';
import { AuthService } from '../../auth/auth.service';
import { FindActiveCorteDiarioService } from '../corte-diario/find-active-corte-diario.service';
import { FindActiveCorteParcialService } from './find-active-corte-parcial.service';

@Injectable({
  providedIn: 'root'
})
export class OpenCorteParcialService {

  constructor(
    private ActiveCorteDiario: FindActiveCorteDiarioService,
    private xFinder: FindActiveCorteParcialService,
    private auth : AuthService
  ) { }

  async open() {
    const corteDiario = await this.ActiveCorteDiario.find();
    if (!corteDiario) {
      return null;
    }

    const corteParcial = await this.xFinder.find();
    if (corteParcial) {
      return null; // ya existe
    }

    const user = await this.auth.user();
    if (user == undefined || user == null) {
      return null;
    }

    //inactivar todos los cortes anteriores
    await db.cortesParciales.toCollection().modify({ status: CortesStatus.Inactive });

    //inicializar nuevo corte
    const corte: CorteParcial = {
      codigo: 'cp-' + v4(),
      numero_corte: '',
      codigo_corte_diario: corteDiario.codigo,
      fecha_inicio: new Date(),
      status: CortesStatus.Active,
      usuario_id: (user.id) ? user.id : 0
    };

    const id = await db.cortesParciales.add(corte);
    return id;
  }
}
