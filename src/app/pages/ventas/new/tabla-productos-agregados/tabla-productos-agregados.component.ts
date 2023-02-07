import { Component, Input } from '@angular/core';
import { liveQuery } from 'dexie';
import { NotifyService } from 'src/app/services/Notifications/notify.service';
import { ChangeQuantityService } from 'src/app/services/orders/added-products/change-quantity.service';
import { DeleteProductsService } from 'src/app/services/orders/added-products/delete-products.service';
import { FindProductsService } from 'src/app/services/orders/added-products/find-products.service';
import { ProductoOrden } from 'src/app/storage/schema/productos/productos_orden';
import { MessageType } from 'src/app/utilities/messages';
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
    private quantityChanger: ChangeQuantityService,
    private notifier : NotifyService
  ) { }

  async getOrderProducts() {
    return this.findOrderProductsService.allByOrderCode(this.codigoVenta);
  }

  async deleteOrderProduct(prodCode: string, orderProductId?: number) {
    if (orderProductId != null) {
      const response = await this.deleteOrderProductService.delete(orderProductId, prodCode);
      this.notifier.show(response.type, response.title);
    }
  }

  async changeQuantity(event: any, productId: any, precio: number, productCode: string, cantidadAnterior : number) {
    const cantidad = event.target.value;
    const subtotal = Number(cantidad) * Number(precio);

    const response = await this.quantityChanger.change(productCode, productId, cantidad, subtotal);
    this.notifier.show(response.type, response.title);

    if(response.type == MessageType.error){
      event.target.value = cantidadAnterior;
    }
  }
}
