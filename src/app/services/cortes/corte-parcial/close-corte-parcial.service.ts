import { Injectable } from '@angular/core';
import { db } from 'src/app/storage/db';
import { CorteTipoPago } from 'src/app/storage/schema/cortes/cortes_tipo_pagos';
import { CortesStatus } from 'src/app/utilities/cortes_status';
import { Message, MessageType } from 'src/app/utilities/messages';
import { RegistrarPagoCortesService } from '../pagos/registrar-pago-cortes.service';
import { FindActiveCorteParcialService } from './find-active-corte-parcial.service';

@Injectable({
  providedIn: 'root'
})
export class CloseCorteParcialService {

  constructor(
    private parcialFinder: FindActiveCorteParcialService,
    private bulkService: RegistrarPagoCortesService
  ) { }

  async close(montos: CorteTipoPago[]): Promise<Message> {
    const activeX = await this.parcialFinder.find();
    if (!activeX) {
      return {
        title: 'No existe ningun corte X activo',
        type: MessageType.error
      }
    }


    await db.transaction('rw', 'transacciones', async () => {
      montos.forEach(m => m.codigo_corte = activeX.codigo);
      const response = await this.bulkService.bulk(montos);
      if (response.type == MessageType.success) {
        await db.cortesParciales.where({ codigo: activeX.codigo }).modify({ status: CortesStatus.Inactive });
        return {
          title: 'Se ha cerrado el corte de forma correcta',
          type: MessageType.success
        }
      }

      return {
        title: 'Ha ocurrido un error al cerrar el corte',
        type: MessageType.error
      }
    });

    return {
      title: 'Error',
      type: MessageType.error
    }

  }
}
