import { Injectable } from '@angular/core';
import { db } from 'src/app/storage/db';

@Injectable({
  providedIn: 'root'
})
export class FindNumeradoresService {

  constructor() { }

  async all(){
    return await db.numeradores.toArray();
  }

  async findByTipoDoc(tipoDoc : string){
    const numerador = db.numeradores.where({tipo_documento: tipoDoc}).first();
    return numerador;
  }
}
