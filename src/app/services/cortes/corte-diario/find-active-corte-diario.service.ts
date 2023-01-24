import { Injectable } from '@angular/core';
import { db } from 'src/app/storage/db';
import { CortesStatus } from 'src/app/utilities/cortes_status';

@Injectable({
  providedIn: 'root'
})
export class FindActiveCorteDiarioService {

  constructor() { }

  async find(){
    const response = await db.cortesDiarios.where({
      status: CortesStatus.Active
    }).toArray();

    if(response.length > 0){
      return response[0];
    }

    return null;
  }
}
