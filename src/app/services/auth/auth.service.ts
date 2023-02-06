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

      const empleados = await db.empleados.where({
        codigo: session.codigo_usuario
      }).limit(1).toArray();
      if (empleados.length == 0) {
        return null;
      }
      return empleados[0];
    }

    return null;

  }

  async logout() {
    //inactivar todas las sesiones que pudieran estar activas por error
    await db.sesionesAuth.toCollection().modify({ status: StatusSesion.Inactiva });
  }
}
