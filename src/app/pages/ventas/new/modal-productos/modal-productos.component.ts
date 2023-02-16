import { Component, Input } from '@angular/core';
import { liveQuery } from 'dexie';
import { FindCategoriesService } from 'src/app/services/categories/find-categories.service';
import { FindActiveCorteParcialService } from 'src/app/services/cortes/corte-parcial/find-active-corte-parcial.service';
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
  categoryIndexActive = 0;

  constructor(
    private categoryFinder: FindCategoriesService,
    private storeOrderProductService: StoreProductsService,
    private notify: NotifyService,
    private findProducts: FindProductsService,
    private quantityChanger: ChangeQuantityService,
    private xFinder : FindActiveCorteParcialService
  ) {
  }

  async getCategoriesWithProducts() {
    return await this.categoryFinder.allWithProducts();
  }

  setActiveCategoryIndex(index : number){
    this.categoryIndexActive = index;
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
        const response = await this.quantityChanger.change(productInOrder.codigo_producto, productInOrder.id, Number(nuevaCantidad), Number(nuevaCantidad * precio));
        if (response.type == MessageType.success) {
          this.notify.success('Se ha incrementado la cantidad de este producto');
        } else {
          this.notify.show(response.type, response.title);
        }
      }
      return;
    }

    //consultar corte x actual
    const corteX = await this.xFinder.find();
    if(!corteX){
      this.notify.error('Ha ocurrido un error');
      return;
    }
    let orderProduct: ProductoOrden = {
      codigo_producto: codigoProducto,
      nombre_producto: nombre,
      precio: precio,
      cantidad: 1,
      subtotal: precio,
      codigo_orden: this.codigoVenta,
      codigo_corte_x: corteX.codigo
    }
    const message = await this.storeOrderProductService.store(orderProduct);
    this.notify.show(message.type, message.title);
  }
}
