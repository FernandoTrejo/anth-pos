import { Component, ElementRef, ViewChild } from '@angular/core';
import { liveQuery } from 'dexie';
import { BreadcrumbItem } from 'src/app/components/global/breadcrumb/breadcrumb.component';
import { CalculateTotalOrderService } from 'src/app/services/orders/added-products/calculate-total-order.service';
import { FindProductsService } from 'src/app/services/orders/added-products/find-products.service';
import { StoreOrderService } from 'src/app/services/orders/store-order.service';
import { Transacciones } from 'src/app/storage/schema/transacciones/transacciones';
import { Status } from 'src/app/utilities/status';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent {
  breadcrumbItems: Array<BreadcrumbItem> = [
    {
      title: 'Transacciones',
      link: ''
    },
    {
      title: 'Ventas',
      link: '/ventas'
    },
    {
      title: 'Nueva',
      link: ''
    }
  ];

  // HARDCODE
  tablaResumenPagoVisible = liveQuery(() => this.getTablaResumenPagoVisibility('123456'));
  tipoTransaccion = 'venta';

  constructor(private findProducts: FindProductsService, private processOrder: StoreOrderService, private calculateTotal : CalculateTotalOrderService) { }

  async getTablaResumenPagoVisibility(codigo: string) {
    const productsCount = await this.findProducts.countAllByOrderCode(codigo);
    return Number(productsCount) > 0;
  }


  // PROCESAR ORDEN
  async process(nombre_cliente : string, orderCode : string) {
    const total = await this.calculateTotal.calculate(orderCode);
    let transaccion: Transacciones = {
      codigo: orderCode,
      fecha: new Date,
      referencia: '',
      nombre_cliente: nombre_cliente,
      total: Number(total),
      tipo_transaccion: this.tipoTransaccion,
      status: Status.Closed
    };
    await this.processOrder.process(transaccion);
  }
}
