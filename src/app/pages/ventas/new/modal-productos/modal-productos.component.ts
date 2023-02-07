import { Component, Input } from '@angular/core';
import { liveQuery } from 'dexie';
import { FindCategoriesService } from 'src/app/services/categories/find-categories.service';
import { NotifyService } from 'src/app/services/Notifications/notify.service';
import { ChangeQuantityService } from 'src/app/services/orders/added-products/change-quantity.service';
import { FindProductsService } from 'src/app/services/orders/added-products/find-products.service';
import { StoreProductsService } from 'src/app/services/orders/added-products/store-products.service';
import { ProductoOrden } from 'src/app/storage/schema/productos/productos_orden';
import { MessageType } from 'src/app/utilities/messages';

@Component({
  selector: 'app-modal-productos',
  templateUrl: './modal-productos.component.html',
  styleUrls: ['./modal-productos.component.css']
})
export class ModalProductosComponent {
  @Input() codigoVenta: string = '';
  categoriesWithProducts = liveQuery(() => this.getCategoriesWithProducts());

  constructor(
    private categoryFinder: FindCategoriesService,
    private storeOrderProductService: StoreProductsService,
    private notify: NotifyService,
    private findProducts: FindProductsService,
    private quantityChanger: ChangeQuantityService
  ) {
  }

  async getCategoriesWithProducts() {
    return await this.categoryFinder.allWithProducts();
  }

  async storeOrderProduct(
    codigoProducto: string,
    nombre: string,
    precio: number
  ) {
    const productInOrder = await this.findProducts.findProductInOrder(this.codigoVenta, codigoProducto)
    if (productInOrder) {
      if (productInOrder.id) {
        const nuevaCantidad = Number(productInOrder.cantidad) + 1;
        await this.quantityChanger.change(productInOrder.codigo_producto, productInOrder.id, Number(nuevaCantidad), Number(nuevaCantidad * precio));
        this.notify.success('Se ha incrementado la cantidad de este producto');
      }
      return;
    }


    let orderProduct: ProductoOrden = {
      codigo_producto: codigoProducto,
      nombre_producto: nombre,
      precio: precio,
      cantidad: 1,
      subtotal: precio,
      codigo_orden: this.codigoVenta
    }
    const message = await this.storeOrderProductService.store(orderProduct);
    this.notify.show(message.type, message.title);
  }
}
