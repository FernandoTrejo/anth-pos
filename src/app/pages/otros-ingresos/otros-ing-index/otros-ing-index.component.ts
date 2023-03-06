import { Component, OnInit } from '@angular/core';
import { liveQuery } from 'dexie';
import { BreadcrumbItem } from 'src/app/components/global/breadcrumb/breadcrumb.component';
import { NextNumService } from 'src/app/services/numeradores/next-num.service';
import { FindOrdersCorteActualService } from 'src/app/services/orders/find-orders-corte-actual.service';
import { formatDateTime } from 'src/app/utilities/date';
import { Money } from 'src/app/utilities/money';
import { Status } from 'src/app/utilities/status';
import { TipoDocumentos, TraducirTipoDocumento } from 'src/app/utilities/tipo_documentos';
import { TipoTransacciones } from 'src/app/utilities/tipo_transacciones';

@Component({
  selector: 'app-otros-ing-index',
  templateUrl: './otros-ing-index.component.html',
  styleUrls: ['./otros-ing-index.component.css']
})
export class OtrosIngIndexComponent implements OnInit{
  //breadcrumb
  breadcrumbItems: Array<BreadcrumbItem> = [
    {
      title: 'Transacciones',
      link: ''
    },
    {
      title: 'Otros Ingresos',
      link: ''
    }
  ];

  transacciones = liveQuery(() => this.currentOrders.find(TipoTransacciones.OtrosIngresos));

  constructor(private currentOrders : FindOrdersCorteActualService, private nextNumService : NextNumService){}

  mensajeErrorNumerador = '';
  async ngOnInit() {
    if(!(await this.nextNumService.validateNext(TipoDocumentos.TicketOtrosIngresos))){
      this.mensajeErrorNumerador = 'No hay correlativos para este documento. Favor solicitar nuevos.'
    }else{
      this.mensajeErrorNumerador = '';
    }

  }

  statusCerrada = Status.Closed;
  statusAbierta = Status.Open;
  statusAnulada = Status.Nulled;

  statusActual = '';

  viewStatus(status : string){
    this.statusActual = status;
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
}
