import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { liveQuery } from 'dexie';
import { Observable } from 'rxjs';
import { BreadcrumbItem } from 'src/app/components/global/breadcrumb/breadcrumb.component';
import { FindActiveCorteDiarioService } from 'src/app/services/cortes/corte-diario/find-active-corte-diario.service';
import { FindActiveCorteMensualService } from 'src/app/services/cortes/corte-mensual/find-active-corte-mensual.service';
import { FindActiveCorteParcialService } from 'src/app/services/cortes/corte-parcial/find-active-corte-parcial.service';
import { NotifyService } from 'src/app/services/Notifications/notify.service';
import { CalculateTotalOrderService } from 'src/app/services/orders/added-products/calculate-total-order.service';
import { FindProductsService } from 'src/app/services/orders/added-products/find-products.service';
import { DeleteOrderDataService } from 'src/app/services/orders/delete-order-data.service';
import { FindByCodeService } from 'src/app/services/orders/find-by-code.service';
import { StoreOrderService } from 'src/app/services/orders/store-order.service';
import { GetAllowedPaymentTypesService } from 'src/app/services/payments/get-allowed-payment-types.service';
import { TipoPagoPermitido } from 'src/app/storage/schema/pagos/tipos_pago';
import { Transacciones } from 'src/app/storage/schema/transacciones/transacciones';
import { MessageType } from 'src/app/utilities/messages';
import { Status } from 'src/app/utilities/status';
import { TipoDocumentos } from 'src/app/utilities/tipo_documentos';
import { TipoTransacciones } from 'src/app/utilities/tipo_transacciones';
import { v4 as v4uuid } from 'uuid';
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

  tablaResumenPagoVisible = liveQuery(() => this.getTablaResumenPagoVisibility());
  tipoTransaccion = TipoTransacciones.Venta;
  codigoVenta = v4uuid();
  nombreCliente = '';
  pagosPermitidos = liveQuery(() => this.getPagosPermitidos());
  tipoEfectivo = 'efectivo';
  tipoTarjeta = 'tarjeta';

  documentoSeleccionado = 'ticket_venta';

  constructor(
    private findProducts: FindProductsService,
    private processOrder: StoreOrderService,
    private calculateTotal: CalculateTotalOrderService,
    private router: Router,
    private findCorteMensual: FindActiveCorteMensualService,
    private findCorteParcial: FindActiveCorteParcialService,
    private findCorteDiario: FindActiveCorteDiarioService,
    private deleteOrderData: DeleteOrderDataService,
    private paymentTypeFinder: GetAllowedPaymentTypesService,
    private notifier : NotifyService
  ) {
    console.log(this.codigoVenta);
  }

  async getTablaResumenPagoVisibility() {
    const productsCount = await this.findProducts.countAllByOrderCode(this.codigoVenta);
    return Number(productsCount) > 0;
  }


  // PROCESAR ORDEN
  async process() {
    const total = await this.calculateTotal.calculate(this.codigoVenta);
    const corteMensual = await this.findCorteMensual.find();
    const corteDiario = await this.findCorteDiario.find();
    const corteParcial = await this.findCorteParcial.find();

    if (!corteMensual || !corteDiario || !corteParcial || Number(total) == 0) {
      return;
    }

    let transaccion: Transacciones = {
      codigo: this.codigoVenta,
      numero_transaccion: '',
      fecha: new Date,
      referencia: '',
      nombre_cliente: this.nombreCliente,
      total: Number(total),
      tipo_transaccion: this.tipoTransaccion,
      status: Status.Closed,
      corte_diario: corteDiario.codigo,
      corte_parcial: corteParcial.codigo,
      corte_mensual: corteMensual.codigo,
      tipo_documento_clave: this.documentoSeleccionado
    };
    await this.processOrder.process(transaccion);
    this.router.navigate(['/ventas']);
  }

  // COLOCAR ORDEN EN ESPERA
  async waiting() {
    const total = await this.calculateTotal.calculate(this.codigoVenta);
    const corteMensual = await this.findCorteMensual.find();
    const corteDiario = await this.findCorteDiario.find();
    const corteParcial = await this.findCorteParcial.find();

    if (!corteMensual || !corteDiario || !corteParcial || Number(total) == 0) {
      return;
    }

    let transaccion: Transacciones = {
      codigo: this.codigoVenta,
      numero_transaccion: '',
      fecha: new Date,
      referencia: '',
      nombre_cliente: this.nombreCliente,
      total: Number(total),
      tipo_transaccion: this.tipoTransaccion,
      status: Status.Open,
      corte_diario: corteDiario.codigo,
      corte_parcial: corteParcial.codigo,
      corte_mensual: corteMensual.codigo,
      tipo_documento_clave: this.documentoSeleccionado
    };
    await this.processOrder.process(transaccion);
    this.router.navigate(['/ventas']);
  }

  actualizarNombreCliente(nombre: string) {
    this.nombreCliente = nombre;
  }

  async getPagosPermitidos() {
    const response = await this.paymentTypeFinder.get();
    if (response) {
      return response;
    }

    return [];
  }

  async pagoEsPermitido(codigo: string) {
    const pagos = await this.getPagosPermitidos();
    console.log(pagos.find(pago => pago.codigo === codigo));
    return pagos.find(pago => pago.codigo === codigo);
  }

  changeDocSelection(event : any){
    this.documentoSeleccionado = (event.target.value);
  }

  async cancelOrder(){
    const response = await this.deleteOrderData.removeAll(this.codigoVenta);
    if(response.type == MessageType.error){
      this.notifier.error(response.title);
      return;
    }

    this.router.navigate(['ventas']);
  }
}
