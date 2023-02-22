import { Injectable } from '@angular/core';
import { db } from 'src/app/storage/db';

@Injectable({
  providedIn: 'root'
})
export class FindClientWithFiltersService {

  constructor() { }

  async find(filters : Object, limit : number = -1){
    if(limit == -1){
      return this.all();
    }

    const clients = await db.clientes.where(filters).limit(limit).toArray();
    return clients;
  }

  async all(){
    const all = await db.clientes.toArray();
    return all;
  }
}
