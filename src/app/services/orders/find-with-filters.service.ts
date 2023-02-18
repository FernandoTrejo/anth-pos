import { Injectable } from '@angular/core';
import { db } from 'src/app/storage/db';

@Injectable({
  providedIn: 'root'
})
export class FindWithFiltersService {

  constructor() { }

  async find(filters : object){
    const transacciones = await db.transacciones.where(filters).toArray();
    return transacciones;
  }
}
