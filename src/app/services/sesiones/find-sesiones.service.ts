import { Injectable } from '@angular/core';
import { db } from 'src/app/storage/db';

@Injectable({
  providedIn: 'root'
})
export class FindSesionesService {

  constructor() { }

  async all() {
    const sesiones = await db.sesionesAuth.toArray();

    await Promise.all(sesiones.map(async sesion => {
      sesion.datosUser = await db.empleados.get((sesion.id_usuario) ? sesion.id_usuario : 0);
    }));

    return sesiones;
  }
}
