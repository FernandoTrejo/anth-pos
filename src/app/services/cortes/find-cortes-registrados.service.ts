import { Injectable } from '@angular/core';
import { db } from 'src/app/storage/db';
import { CorteTipoPago } from 'src/app/storage/schema/cortes/cortes_tipo_pagos';

@Injectable({
  providedIn: 'root'
})
export class FindCortesRegistradosService {

  constructor() { }

  async all() {
    const cortes = await db.cortesFinalizados.toArray();
    await Promise.all(cortes.map(async corte => {
      corte.datosUser = await db.empleados.get((corte.usuario_id) ? corte.usuario_id : 0);
    }));
    return cortes;
  }
}
