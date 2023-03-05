import { Injectable } from '@angular/core';
import { db } from 'src/app/storage/db';
import { Message, MessageType } from 'src/app/utilities/messages';

@Injectable({
  providedIn: 'root'
})
export class NextNumService {

  constructor() { }

  async validateNext(tipoDoc : string) : Promise<boolean>{
    const numerador = await db.numeradores.where(
      {tipo_documento: tipoDoc}
    ).first();

    if(numerador != undefined){
      const actual = Number(numerador.actual);
      const inicio = Number(numerador.inicio);
      const fin = Number(numerador.fin);
      

      const siguiente = actual + 1;

      return (siguiente <= fin && siguiente >= inicio);
    }

    return false;
  }

  async next(tipoDoc : string){
    const numerador = await db.numeradores.where(
      {tipo_documento: tipoDoc}
    ).first();

    if(numerador != undefined){
      const actual = Number(numerador.actual);
      const siguiente = actual + 1;
      
      const numeracion : string = numerador.numeracion;

      return numerador.prefijo + (numeracion + siguiente).slice(-numeracion.length);
    }

    return '';
  }

  async updateActual(tipoDoc : string) : Promise<Message>{
    try {
      await db.numeradores.where(
        {tipo_documento: tipoDoc}
      ).modify(numerador => {
        numerador.actual = Number(numerador.actual) + 1
      });
      return {
        title: '',
        type: MessageType.success
      }
    } catch (error) {
      console.log(error);
      return {
        title: 'Ha ocurrido un error inesperado',
        type: MessageType.error
      }
    }
  }
}
