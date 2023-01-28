import { Component, Input, OnDestroy, OnInit } from '@angular/core';
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

  codigoVenta: string = '';
  private sub: any;

  async ngOnInit() {
    this.sub = this.route.params.subscribe((params: { [x: string]: string; }) => {
      this.codigoVenta = params['codigo_venta'];
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  constructor(
    private findProducts: FindProductsService,
    private processOrder: StoreOrderService,
    private calculateTotal: CalculateTotalOrderService,
    private router: Router,
    private findCorteMensual: FindActiveCorteMensualService,
    private findCorteParcial: FindActiveCorteParcialService,
    private findCorteDiario: FindActiveCorteDiarioService,
    private updateOrder: UpdateOrderService,
    private route: ActivatedRoute

  ) {
  }

  async getTablaResumenPagoVisibility() {
    const productsCount = await this.findProducts.countAllByOrderCode(this.codigoVenta);
    return Number(productsCount) > 0;
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
      corte_mensual: corteMensual.codigo
    };
    await this.updateOrder.update(this.codigoVenta, transaccion);
    this.router.navigate(['/ventas']);
  }

  async process() {
    await this.store(Status.Closed);
  }

  async waiting() {
    await this.store(Status.Open);
  }

  actualizarNombreCliente(nombre: string) {
    this.nombreCliente = nombre;
  }
}
