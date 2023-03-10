import { Component, OnInit } from '@angular/core';
import { liveQuery } from 'dexie';
import { BreadcrumbItem } from 'src/app/components/global/breadcrumb/breadcrumb.component';
import { FindActiveCorteDiarioService } from 'src/app/services/cortes/corte-diario/find-active-corte-diario.service';
import { FindWithFiltersService } from 'src/app/services/orders/find-with-filters.service';
import { formatDateTime } from 'src/app/utilities/date';
import { Status } from 'src/app/utilities/status';
import { TipoTransacciones } from 'src/app/utilities/tipo_transacciones';
import { FindProductsService } from 'src/app/services/orders/added-products/find-products.service';
import { ProductoOrden } from 'src/app/storage/schema/productos/productos_orden';
import { Money } from 'src/app/utilities/money';
import { TipoDocumentos, TraducirTipoDocumento } from 'src/app/utilities/tipo_documentos';
import { NextNumService } from 'src/app/services/numeradores/next-num.service';

@Component({
  selector: 'app-devoluciones-new',
  templateUrl: './devoluciones-new.component.html',
  styleUrls: ['./devoluciones-new.component.css']
})
export class DevolucionesNewComponent implements OnInit{
  //breadcrumb
  breadcrumbItems: Array<BreadcrumbItem> = [
    {
      title: 'Transacciones',
      link: ''
    },
    {
      title: 'Devoluciones',
      link: '/devoluciones'
    },
    {
      title: 'Nueva',
      link: ''
    }
  ];

  constructor(
    private transactionFinder: FindWithFiltersService,
    private zFinder: FindActiveCorteDiarioService,
    private nextNumService : NextNumService
  ) { }

  mensajeErrorNumerador = '';
  async ngOnInit(){
    if(! (await this.nextNumService.validateNext(TipoDocumentos.TicketDevolucion))){
      this.mensajeErrorNumerador = 'No hay correlativos para el documento seleccionado. Favor solicitar nuevos.'
    }else{
      this.mensajeErrorNumerador = '';
    }
  }

  statusCerrada = Status.Closed;
  statusAbierta = Status.Open;
  statusAnulada = Status.Nulled;

  ventasDiarias = liveQuery(() => this.findVentasDiarias());
  async findVentasDiarias() {
    const z = await this.zFinder.find();

    const filters = {
      tipo_transaccion: TipoTransacciones.Venta,
      corte_diario: (z) ? z.codigo : ''
    };

    return await this.transactionFinder.find(filters);
  }

  format(date: Date) {
    return formatDateTime(date);
  }

  formatMoney(quantity : number){
    return (new Money(quantity)).toString();
  }

  mostrarTipoDoc(tipo : string){
    return TraducirTipoDocumento(tipo);
  }

  ventaCodigo = '';
  showPanel(codigo: string) {
    this.ventaCodigo = codigo;
  }
}
