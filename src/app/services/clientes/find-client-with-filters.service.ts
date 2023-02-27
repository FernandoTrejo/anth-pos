import { Injectable } from '@angular/core';
import { db } from 'src/app/storage/db';
import { TipoCliente } from 'src/app/storage/schema/clientes/clientes';

@Injectable({
  providedIn: 'root'
})
export class FindClientWithFiltersService {

  constructor() { }

  async find(filters : Object, limit : number = -1){
    if(limit == -1){
      return await db.clientes.where(filters).toArray();
    }

    const clients = await db.clientes.where(filters).limit(limit).toArray();
    return clients;
  }

  async findByName(name : string, tipoCliente : string = TipoCliente.Empresa){
    const clients = await db.clientes.filter((cliente) => {
      return cliente.nombre_cliente.toLowerCase().includes(name.toLowerCase()) && cliente.tipo_cliente == tipoCliente;
    });
    return clients.toArray();
  }

  async all(tipoCliente : string = TipoCliente.Empresa){
    const all = await db.clientes.where({
      tipo_cliente: tipoCliente
    }).toArray();
    return all;
  }
}
