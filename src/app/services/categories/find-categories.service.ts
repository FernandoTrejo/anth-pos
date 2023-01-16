import { Injectable } from '@angular/core';
import { db } from 'src/app/storage/db';

@Injectable({
  providedIn: 'root'
})
export class FindCategoriesService {

  constructor() { }

  async allWithProducts(){
    let categorias = await db.categorias.toArray();

    for(let categoria of categorias){
      categoria.productos = await db.productos.where({id_categoria: categoria.id}).toArray();
    }
    console.log(categorias);
    return categorias;
  }
}
