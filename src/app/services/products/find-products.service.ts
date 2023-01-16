import { Injectable } from '@angular/core';
import { db } from 'src/app/storage/db';

@Injectable({
  providedIn: 'root'
})
export class FindProductsService {

  constructor() { }

  async all(){
    return await db.productos.toArray();
  }
}
