import { Component } from '@angular/core';
import { liveQuery } from 'dexie';
import { BreadcrumbItem } from 'src/app/components/global/breadcrumb/breadcrumb.component';
import { FindOrdersCorteActualService } from 'src/app/services/orders/find-orders-corte-actual.service';
import { Status } from 'src/app/utilities/status';
import { TipoTransacciones } from 'src/app/utilities/tipo_transacciones';
import { formatDate } from 'src/app/utilities/date';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  ventas = liveQuery(() => this.currentOrders.find(TipoTransacciones.Venta));

  statusCerrada = Status.Closed;
  statusAbierta = Status.Open;
  statusAnulada = Status.Nulled;

  statusActual = '';

  viewStatus(status : string){
    this.statusActual = status;
  }

  format(date: Date) {
    return formatDate(date);
  }

  //breadcrumb
  breadcrumbItems : Array<BreadcrumbItem> = [
    {
      title: 'Transacciones',
      link: ''
    },
    {
      title: 'Ventas',
      link: ''
    }
  ];

  constructor(private currentOrders : FindOrdersCorteActualService){}
}
