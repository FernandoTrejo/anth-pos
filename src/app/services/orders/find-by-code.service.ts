import { Injectable } from '@angular/core';
import { db } from 'src/app/storage/db';

@Injectable({
  providedIn: 'root'
})
export class FindByCodeService {

  constructor() { }

  async find(code : string){
    const ordenes = await db.transacciones.where({
      codigo: code
    }).toArray();
    if(ordenes.length > 0){
      return ordenes[0];
    }
    return null;
  }
}
