import { Component, Input } from '@angular/core';
import { liveQuery } from 'dexie';
import { ChangeQuantityService } from 'src/app/services/orders/added-products/change-quantity.service';
import { DeleteProductsService } from 'src/app/services/orders/added-products/delete-products.service';
import { FindProductsService } from 'src/app/services/orders/added-products/find-products.service';
import { ProductoOrden } from 'src/app/storage/schema/productos/productos_orden';
import { Status } from 'src/app/utilities/status';

@Component({
  selector: 'app-tabla-productos-agregados',
  templateUrl: './tabla-productos-agregados.component.html',
  styleUrls: ['./tabla-productos-agregados.component.css']
})
export class TablaProductosAgregadosComponent {
  @Input() codigoVenta: string = '';
  @Input() statusTransaccion: string = '';
  productosAgregados = liveQuery(() => this.getOrderProducts());
  statusCerrada = Status.Closed;

  constructor(
    private findOrderProductsService: FindProductsService,
    private deleteOrderProductService: DeleteProductsService,
    private quantityChanger : ChangeQuantityService
  ) { }

  async getOrderProducts() {
    return this.findOrderProductsService.allByOrderCode(this.codigoVenta);
  }

  async deleteOrderProduct(orderProductId?: number) {
    if (orderProductId != null) {
      await this.deleteOrderProductService.delete(orderProductId);
    }
  }

  async changeQuantity(event: any, productId: any, precio: number) {
    const cantidad = event.target.value;
    const subtotal = Number(cantidad) * Number(precio);

    await this.quantityChanger.change(productId, cantidad, subtotal);
  }
}
