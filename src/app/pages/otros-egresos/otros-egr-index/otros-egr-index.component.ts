import { Component } from '@angular/core';
import { liveQuery } from 'dexie';
import { BreadcrumbItem } from 'src/app/components/global/breadcrumb/breadcrumb.component';
import { FindOrdersCorteActualService } from 'src/app/services/orders/find-orders-corte-actual.service';
import { formatDateTime } from 'src/app/utilities/date';
import { Money } from 'src/app/utilities/money';
import { Status } from 'src/app/utilities/status';
import { TraducirTipoDocumento } from 'src/app/utilities/tipo_documentos';
import { TipoTransacciones } from 'src/app/utilities/tipo_transacciones';

@Component({
  selector: 'app-otros-egr-index',
  templateUrl: './otros-egr-index.component.html',
  styleUrls: ['./otros-egr-index.component.css']
})
export class OtrosEgrIndexComponent {
//breadcrumb
breadcrumbItems: Array<BreadcrumbItem> = [
  {
    title: 'Transacciones',
    link: ''
  },
  {
    title: 'Otros Egresos',
    link: ''
  }
];

transacciones = liveQuery(() => this.currentOrders.find(TipoTransacciones.OtrosEgresos));

constructor(private currentOrders : FindOrdersCorteActualService){}

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
