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

  async findByName(name : string){
    const clients = await db.clientes.filter((cliente) => {
      return cliente.nombre_cliente.toLowerCase().includes(name.toLowerCase());
    });
    return clients.toArray();
  }

  async all(){
    const all = await db.clientes.toArray();
    return all;
  }
}
