import { Injectable } from '@angular/core';
import { db } from 'src/app/storage/db';
import { ProductoOrden } from 'src/app/storage/schema/productos/productos_orden';
import { Message, Messages, MessageType } from 'src/app/utilities/messages';

@Injectable({
  providedIn: 'root'
})
export class StoreProductsService {

  constructor() { }

  async store(productOrder: ProductoOrden): Promise<Message> {
    const response = await db.transaction('rw', db.productosOrden, db.productos, async () => {
   
      //obtener producto a modificar
      const productFilter = {codigo: productOrder.codigo_producto};
      const productList = await db.productos.where(productFilter).toArray();
      const product = (productList.length > 0) ? productList[0] : null;
      if(!product){
        return {
          title: 'El codigo de producto no existe',
          type: MessageType.error
        };
      }

      
      // calcular nueva cantidad en existencias
      const newQuantity = Number(product.existencias) - Number(productOrder.cantidad);
      if(newQuantity < 0){
        return {
          title: 'Stock insuficiente',
          type: MessageType.error
        };
      }

      // agregar producto a la orden
      const id = await db.productosOrden.add(productOrder);
      //actualizar producto
      await db.productos.where(productFilter).modify({existencias: newQuantity});

      return {
        title: 'El producto se ha agregado correctamente',
        type: MessageType.success
      };
    }).catch(err => {
      console.log(err);
      return {
        title: 'Ha ocurrido un error al agregar el producto',
        type: MessageType.error
      };
    });

    return response;
  }
}
