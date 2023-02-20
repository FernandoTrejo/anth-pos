import { Component } from '@angular/core';
import { liveQuery } from 'dexie';
import { Status } from 'src/app/utilities/status';
import { FindOrdersCorteActualService } from 'src/app/services/orders/find-orders-corte-actual.service';
import { TipoTransacciones } from 'src/app/utilities/tipo_transacciones';
import { formatDateTime } from 'src/app/utilities/date';
import { BreadcrumbItem } from 'src/app/components/global/breadcrumb/breadcrumb.component';
import { Money } from 'src/app/utilities/money';

@Component({
  selector: 'app-devoluciones-index',
  templateUrl: './devoluciones-index.component.html',
  styleUrls: ['./devoluciones-index.component.css']
})
export class DevolucionesIndexComponent {

  devoluciones = liveQuery(() => this.currentOrders.find(TipoTransacciones.Devolucion));
  statusCerrada = Status.Closed;
  statusAbierta = Status.Open;
  statusAnulada = Status.Nulled;

  statusActual = '';
  constructor(private currentOrders : FindOrdersCorteActualService){}
  format(date: Date) {
    return formatDateTime(date);
  }

  //breadcrumb
  breadcrumbItems : Array<BreadcrumbItem> = [
    {
      title: 'Transacciones',
      link: ''
    },
    {
      title: 'Devoluciones',
      link: ''
    }
  ];

  formatMoney(q : number){
    return (new Money(Math.abs(q))).toString();
  }
}
