import { Injectable } from '@angular/core';
import { db } from 'src/app/storage/db';
import { formatDate } from 'src/app/utilities/date';

@Injectable({
  providedIn: 'root'
})
export class ValidateDateService {

  constructor() { }

  async validate(date : Date){
    const cortes = await db.cortesDiarios.filter((corte) => {
      return formatDate(corte.fecha_inicio) == formatDate(date);
    }).toArray();

    return cortes.length == 0;
  }
}
