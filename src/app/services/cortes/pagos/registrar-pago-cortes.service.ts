import { Injectable } from '@angular/core';
import { db } from 'src/app/storage/db';
import { CorteTipoPago } from 'src/app/storage/schema/cortes/cortes_tipo_pagos';
import { Message, MessageType } from 'src/app/utilities/messages';

@Injectable({
  providedIn: 'root'
})
export class RegistrarPagoCortesService {

  constructor() { }

  async bulk(montosCortes : CorteTipoPago[]) : Promise<Message>{
    try {
      await db.cortesTipoPagos.bulkAdd(montosCortes);
      return {
        title: 'Se han registrado correctamente',
        type: MessageType.success
      }
    } catch (error) {
      return {
        title: 'Ha ocurrido un error inesperado',
        type: MessageType.error
      }
    }
  }
}
