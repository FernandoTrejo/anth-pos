import { Injectable } from '@angular/core';
import { db } from 'src/app/storage/db';

@Injectable({
  providedIn: 'root'
})
export class FindSesionesService {

  constructor() { }

  async all(){
    const sesiones = await db.sesionesAuth.toArray();
    return sesiones;
  }
}
