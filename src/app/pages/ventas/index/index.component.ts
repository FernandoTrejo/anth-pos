import { Component } from '@angular/core';
import { liveQuery } from 'dexie';
import { BreadcrumbItem } from 'src/app/components/global/breadcrumb/breadcrumb.component';
import { FindOrdersCorteActualService } from 'src/app/services/orders/find-orders-corte-actual.service';
import { TipoTransacciones } from 'src/app/utilities/tipo_transacciones';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  ventas = liveQuery(() => this.currentOrders.find(TipoTransacciones.Venta));

  formatDate(date: Date) {
    const offset = date.getTimezoneOffset();
    date = new Date(date.getTime() - (offset * 60 * 1000));
    let firstDate = date.toISOString().split('T')[0];
    let firstDateParts = firstDate.split('-');

    return (firstDateParts[2] + "/" + firstDateParts[1] + "/" + firstDateParts[0]);
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
