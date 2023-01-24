import { Component, Input } from '@angular/core';
import { liveQuery } from 'dexie';
import { FindCategoriesService } from 'src/app/services/categories/find-categories.service';
import { StoreProductsService } from 'src/app/services/orders/added-products/store-products.service';
import { ProductoOrden } from 'src/app/storage/schema/productos/productos_orden';

@Component({
  selector: 'app-modal-productos',
  templateUrl: './modal-productos.component.html',
  styleUrls: ['./modal-productos.component.css']
})
export class ModalProductosComponent {
  @Input() codigoVenta : string = '';
  categoriesWithProducts = liveQuery(() => this.getCategoriesWithProducts());

  constructor(private categoryFinder : FindCategoriesService, private storeOrderProductService : StoreProductsService){
  }

  async getCategoriesWithProducts(){
    return await this.categoryFinder.allWithProducts();
  }

  async storeOrderProduct(
    codigoProducto : string, 
    nombre : string,
    precio: number
  ){
    let orderProduct : ProductoOrden = {
      codigo_producto: codigoProducto,
      nombre_producto: nombre,
      precio: precio,
      cantidad: 1,
      subtotal: precio,
      codigo_orden: this.codigoVenta
    }
    await this.storeOrderProductService.store(orderProduct);
  }
}
