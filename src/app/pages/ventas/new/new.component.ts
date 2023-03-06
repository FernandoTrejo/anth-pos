import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { liveQuery } from 'dexie';
import { Observable } from 'rxjs';
import { BreadcrumbItem } from 'src/app/components/global/breadcrumb/breadcrumb.component';
import { FindAttachedClientToStoreService } from 'src/app/services/clientes/find-attached-client-to-store.service';
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
import { CalculateTotalReceivedService } from 'src/app/services/payments/calculate-total-received.service';
import { ResetClientInOrderService } from 'src/app/services/clientes/reset-client-in-order.service';
import Swal from 'sweetalert2';
import { NextNumService } from 'src/app/services/numeradores/next-num.service';
@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit{
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
    private notifier: NotifyService,
    private findClienteOrden: FindAttachedClientToStoreService,
    private totalReceivedService : CalculateTotalReceivedService,
    private resetClienteService : ResetClientInOrderService,
    private nextNumeradorService : NextNumService
  ) {
    console.log(this.codigoVenta);
    
  }

  async ngOnInit(){
    await this.setMessageNumeradorError();
  }

  async getTablaResumenPagoVisibility() {
    const productsCount = await this.findProducts.countAllByOrderCode(this.codigoVenta);
    return Number(productsCount) > 0;
  }

  async showProcessConfirmation() {
    Swal.fire({
      title: '¿Desea finalizar la orden actual?',
      text: 'Finalizar',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
      confirmButtonText: 'Si'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await this.process();
      }

    });
  }
  // PROCESAR ORDEN
  async process() {
    const total = await this.calculateTotal.calculate(this.codigoVenta);
    const corteMensual = await this.findCorteMensual.find();
    const corteDiario = await this.findCorteDiario.find();
    const corteParcial = await this.findCorteParcial.find();

    if (!corteMensual || !corteDiario || !corteParcial) {
      this.notifier.error('Ha ocurrido un error inesperado'); return;
    }

    if(!(await this.nextNumeradorService.validateNext(this.documentoSeleccionado))){
      this.notifier.error('No hay correlativos disponibles'); return;
    }

    if(!this.totalIsGreaterThanZero(Number(total))){
      this.notifier.error('El total no puede ser $0.00'); return;
    }

    const responseValidationDoc = await this.validateDocumentSelectedData();
    if(!responseValidationDoc){
      return;
    }

    if(!(await this.paymentIsComplete(Number(total)))){
      this.notifier.error('El pago de la orden no esta completo');
      return;
    }

    const nextNum = await this.nextNumeradorService.next(this.documentoSeleccionado);

    let transaccion: Transacciones = {
      codigo: this.codigoVenta,
      numero_transaccion: nextNum,
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
    await this.nextNumeradorService.updateActual(this.documentoSeleccionado);
    this.router.navigate(['/ventas']);
  }

  // COLOCAR ORDEN EN ESPERA
  async waiting() {
    const total = await this.calculateTotal.calculate(this.codigoVenta);
    const corteMensual = await this.findCorteMensual.find();
    const corteDiario = await this.findCorteDiario.find();
    const corteParcial = await this.findCorteParcial.find();

    if (!corteMensual || !corteDiario || !corteParcial) {
      this.notifier.error('Ha ocurrido un error inesperado'); return;
    }

    if (this.documentoSeleccionado == TipoDocumentos.CreditoFiscal ||
      this.documentoSeleccionado == TipoDocumentos.FacturaConsumidorFinal
    ) {
      const cliente = await this.findClienteOrden.find(this.codigoVenta);
      if (cliente != undefined) {
        this.nombreCliente = cliente.nombre_cliente;
      }
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

  mensajeNumeradoresError = '';
  async changeDocSelection(event: any) {
    await this.resetClienteService.reset(this.codigoVenta);
    this.documentoSeleccionado = (event.target.value);
    await this.setMessageNumeradorError();
  }

  async setMessageNumeradorError(){
    if(!(await this.nextNumeradorService.validateNext(this.documentoSeleccionado))){
      this.mensajeNumeradoresError = 'No hay correlativos para el documento seleccionado. Favor solicitar nuevos.';
    }else{
      this.mensajeNumeradoresError = '';
    }
  }

  async cancelOrder() {
    const response = await this.deleteOrderData.removeAll(this.codigoVenta);
    if (response.type == MessageType.error) {
      this.notifier.error(response.title);
      return;
    }

    this.router.navigate(['ventas']);
  }


  /*VALIDACIONES PARA GUARDAR UNA ORDEN*/
  totalIsGreaterThanZero(total : number) : boolean{
    return Number(total) > 0;
  }

  async validateDocumentSelectedData() : Promise<boolean>{
    if (this.documentoSeleccionado == TipoDocumentos.CreditoFiscal ||
      this.documentoSeleccionado == TipoDocumentos.FacturaConsumidorFinal
    ) {
      const cliente = await this.findClienteOrden.find(this.codigoVenta);
      if (cliente != undefined) {
        this.nombreCliente = cliente.nombre_cliente;
        return true;
      }else{
        this.notifier.error('No se ha seleccionado ningun cliente'); 
        return false;
      }
    } else {
      if(this.nombreCliente.trim() == ''){
        this.notifier.error('Debe llenar el nombre del cliente'); 
        return false;
      }else{
        return true;
      }
    }
  }

  async paymentIsComplete(total : number) : Promise<boolean>{
    const received = await this.totalReceivedService.calculate(this.codigoVenta);
    return Number(received) >= Number(total);
  }
}
