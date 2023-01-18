import { Component } from '@angular/core';
import { liveQuery } from 'dexie';
import { DeleteProductsService } from 'src/app/services/orders/added-products/delete-products.service';
import { FindProductsService } from 'src/app/services/orders/added-products/find-products.service';
import { ProductoOrden } from 'src/app/storage/schema/productos/productos_orden';

@Component({
  selector: 'app-tabla-productos-agregados',
  templateUrl: './tabla-productos-agregados.component.html',
  styleUrls: ['./tabla-productos-agregados.component.css']
})
export class TablaProductosAgregadosComponent {

  productosAgregados = liveQuery(() => this.getOrderProducts());

  constructor(private findOrderProductsService : FindProductsService, private deleteOrderProductService : DeleteProductsService){}

  async getOrderProducts(){
    return this.findOrderProductsService.allByOrderCode('123456');
  }

  async deleteOrderProduct(orderProductId? : number){
    if(orderProductId != null){
      await this.deleteOrderProductService.delete(orderProductId);
    }
  }
}
