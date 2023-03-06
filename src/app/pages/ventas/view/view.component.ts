import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { liveQuery } from 'dexie';
import { BreadcrumbItem } from 'src/app/components/global/breadcrumb/breadcrumb.component';
import { FindActiveCorteDiarioService } from 'src/app/services/cortes/corte-diario/find-active-corte-diario.service';
import { FindActiveCorteMensualService } from 'src/app/services/cortes/corte-mensual/find-active-corte-mensual.service';
import { FindActiveCorteParcialService } from 'src/app/services/cortes/corte-parcial/find-active-corte-parcial.service';
import { CalculateTotalOrderService } from 'src/app/services/orders/added-products/calculate-total-order.service';
import { FindByCodeService } from 'src/app/services/orders/find-by-code.service';
import { StoreOrderService } from 'src/app/services/orders/store-order.service';
import { FindProductsService } from 'src/app/services/orders/added-products/find-products.service';
import { TipoTransacciones } from 'src/app/utilities/tipo_transacciones';
import { Transacciones } from 'src/app/storage/schema/transacciones/transacciones';
import { Status } from 'src/app/utilities/status';
import { UpdateOrderService } from 'src/app/services/orders/update-order.service';
import { GetAllowedPaymentTypesService } from 'src/app/services/payments/get-allowed-payment-types.service';
import { TipoDocumentos } from 'src/app/utilities/tipo_documentos';
import { ResetClientInOrderService } from 'src/app/services/clientes/reset-client-in-order.service';
import { FindAttachedClientToStoreService } from 'src/app/services/clientes/find-attached-client-to-store.service';
import { NotifyService } from 'src/app/services/Notifications/notify.service';
import Swal from 'sweetalert2';
import { CalculateTotalReceivedService } from 'src/app/services/payments/calculate-total-received.service';
import { MessageType } from 'src/app/utilities/messages';
import { NextNumService } from 'src/app/services/numeradores/next-num.service';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit, OnDestroy {

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
      title: 'Ver',
      link: ''
    }
  ];

  tablaResumenPagoVisible = liveQuery(() => this.getTablaResumenPagoVisibility());
  tipoTransaccion = TipoTransacciones.Venta;
  nombreCliente = '';
  statusTransaccion = '';

  codigoVenta: string = '';
  private sub: any;
  statusCerrada = Status.Closed;

  pagosPermitidos = liveQuery(() => this.getPagosPermitidos());
  tipoEfectivo = 'efectivo';
  tipoTarjeta = 'tarjeta';

  documentoSeleccionado = 'ticket_venta';
  @ViewChild('optTicket') optTicket!: ElementRef<HTMLOptionElement>;
  @ViewChild('optFactura') optFactura!: ElementRef<HTMLOptionElement>;
  @ViewChild('optCreditoFiscal') optCreditoFiscal!: ElementRef<HTMLOptionElement>;

  async ngOnInit() {
    this.sub = this.route.params.subscribe((params: { [x: string]: string; }) => {
      this.codigoVenta = params['codigo_venta'];
    });

    let datosOrden = await this.getOrderData(this.codigoVenta);
    if (datosOrden) {
      this.nombreCliente = datosOrden?.nombre_cliente;
      this.statusTransaccion = datosOrden.status;
      this.documentoSeleccionado = datosOrden.tipo_documento_clave;
      this.activateOption();
    }

    await this.setMessageNumeradorError();
  }

  back(){
    this.router.navigate(['ventas']);
  }

  activateOption() {
    switch (this.documentoSeleccionado) {
      case TipoDocumentos.TicketVenta:
        this.optTicket.nativeElement.selected = true;
        break;
      case TipoDocumentos.FacturaConsumidorFinal:
        this.optFactura.nativeElement.selected = true;
        break;
      case TipoDocumentos.CreditoFiscal:
        this.optCreditoFiscal.nativeElement.selected = true;
        break;
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  actualizarNombreCliente(nombre: string) {
    this.nombreCliente = nombre;
  }

  async changeDocSelection(event: any) {
    await this.resetClienteService.reset(this.codigoVenta);
    this.documentoSeleccionado = (event.target.value);
    await this.setMessageNumeradorError();
  }

  constructor(
    private findProducts: FindProductsService,
    private calculateTotal: CalculateTotalOrderService,
    private router: Router,
    private findCorteMensual: FindActiveCorteMensualService,
    private findCorteParcial: FindActiveCorteParcialService,
    private findCorteDiario: FindActiveCorteDiarioService,
    private updateOrder: UpdateOrderService,
    private route: ActivatedRoute,
    private findOrder: FindByCodeService,
    private paymentTypeFinder: GetAllowedPaymentTypesService,
    private findClienteOrden: FindAttachedClientToStoreService,
    private resetClienteService: ResetClientInOrderService,
    private notifier: NotifyService,
    private totalReceivedService: CalculateTotalReceivedService,
    private nextNumeradorService : NextNumService
  ) {
  }

  async getTablaResumenPagoVisibility() {
    const productsCount = await this.findProducts.countAllByOrderCode(this.codigoVenta);
    return Number(productsCount) > 0;
  }

  mensajeNumeradoresError = '';
  async setMessageNumeradorError(){
    if(!(await this.nextNumeradorService.validateNext(this.documentoSeleccionado))){
      this.mensajeNumeradoresError = 'No hay correlativos para el documento seleccionado. Favor solicitar nuevos.';
    }else{
      this.mensajeNumeradoresError = '';
    }
  }

  // PROCESAR ORDEN
  async store(status: string) {
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
      status: status,
      corte_diario: corteDiario.codigo,
      corte_parcial: corteParcial.codigo,
      corte_mensual: corteMensual.codigo,
      tipo_documento_clave: ''
    };
    await this.updateOrder.update(this.codigoVenta, transaccion);
    this.router.navigate(['/ventas']);
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

    if (!this.totalIsGreaterThanZero(Number(total))) {
      this.notifier.error('El total no puede ser $0.00'); return;
    }

    const responseValidationDoc = await this.validateDocumentSelectedData();
    if (!responseValidationDoc) {
      return;
    }

    if (!(await this.paymentIsComplete(Number(total)))) {
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
    const response = await this.updateOrder.update(this.codigoVenta, transaccion);
    
    this.notifier.show(response.type, response.title);

    if (response.type == MessageType.success) {
      await this.nextNumeradorService.updateActual(this.documentoSeleccionado);
      this.router.navigate(['/ventas']);
    }
  }

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
    const response = await this.updateOrder.update(this.codigoVenta, transaccion);
    this.notifier.show(response.type, response.title);

    if (response.type == MessageType.success) {
      this.router.navigate(['/ventas']);
    }
  }

  async getOrderData(codigo: string) {
    const order = await this.findOrder.find(codigo);
    return order;
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

  /*VALIDACIONES PARA GUARDAR UNA ORDEN*/
  totalIsGreaterThanZero(total: number): boolean {
    return Number(total) > 0;
  }

  async validateDocumentSelectedData(): Promise<boolean> {
    if (this.documentoSeleccionado == TipoDocumentos.CreditoFiscal ||
      this.documentoSeleccionado == TipoDocumentos.FacturaConsumidorFinal
    ) {
      const cliente = await this.findClienteOrden.find(this.codigoVenta);
      if (cliente != undefined) {
        this.nombreCliente = cliente.nombre_cliente;
        return true;
      } else {
        this.notifier.error('No se ha seleccionado ningun cliente');
        return false;
      }
    } else {
      if (this.nombreCliente.trim() == '') {
        this.notifier.error('Debe llenar el nombre del cliente');
        return false;
      } else {
        return true;
      }
    }
  }

  async paymentIsComplete(total: number): Promise<boolean> {
    const received = await this.totalReceivedService.calculate(this.codigoVenta);
    return Number(received) >= Number(total);
  }
}
