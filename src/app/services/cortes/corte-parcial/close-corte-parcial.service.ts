import { Injectable } from '@angular/core';
import { db } from 'src/app/storage/db';
import { CorteTipoPago, TipoCorte } from 'src/app/storage/schema/cortes/cortes_tipo_pagos';
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


    const response = await db.transaction('rw', db.cortesFinalizados, db.cortesParciales, db.cortesTipoPagos, db.productos, async () => {
      await db.cortesFinalizados.add({
        codigo: activeX.codigo,
        numero_corte: activeX.numero_corte,
        fecha_inicio: activeX.fecha_inicio,
        fecha_fin: new Date(),
        usuario_id: activeX.usuario_id,
        tipo_corte: TipoCorte.Parcial
      });

      montos.forEach(m => m.codigo_corte = activeX.codigo);
      await db.cortesTipoPagos.bulkAdd(montos);
      await db.cortesParciales.where({ codigo: activeX.codigo }).modify({ status: CortesStatus.Inactive });

      await db.productos.toCollection().modify(producto => {
        producto.stock_inicial = producto.existencias;
      });

      return {
        title: 'Se ha cerrado el corte de forma correcta',
        type: MessageType.success
      }

    }).catch(err => {
      
      return {
        title: 'Ha ocurrido un error al cerrar el corte',
        type: MessageType.error
      }
    });

    return response;
  }
}
