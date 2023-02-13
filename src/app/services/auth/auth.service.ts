import { Injectable } from '@angular/core';
import { db } from 'src/app/storage/db';
import { StatusSesion } from 'src/app/storage/schema/auth/sesiones';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  async isAuthenticated() {
    const sessions = await db.sesionesAuth.where({
      status: StatusSesion.Activa
    }).toArray();

    if (sessions.length == 0) {
      return false;
    }

    return true;
  }

  async user() {
    const sessions = await db.sesionesAuth.where({
      status: StatusSesion.Activa
    }).toArray();

    if (sessions.length > 0) {
      const session = sessions[0];

      const empleado = await db.empleados.get((session.id_usuario) ? session.id_usuario : 0);

      return empleado;
    }

    return null;

  }

  async logout() {
    const sessions = await db.sesionesAuth.where({
      status: StatusSesion.Activa
    }).toArray();

    if (sessions.length > 0) {
      const session = sessions[0];

      await db.sesionesAuth.update(session.id ? session.id : 0, { fecha_hora_salida: new Date() });

    }


    //inactivar todas las sesiones que pudieran estar activas por error
    await db.sesionesAuth.toCollection().modify({ status: StatusSesion.Inactiva });
  }
}
