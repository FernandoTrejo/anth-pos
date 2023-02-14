import { Injectable } from '@angular/core';
import { db } from 'src/app/storage/db';

@Injectable({
  providedIn: 'root'
})
export class FindCortesDetailsService {

  constructor() { }

  async details(code : string){
    const registros = await db.cortesTipoPagos.where({
      codigo_corte: code
    }).toArray();

    return registros;
  }
}
