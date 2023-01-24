import { Component } from '@angular/core';
import { liveQuery } from 'dexie';
import { FindOrdersCorteActualService } from 'src/app/services/orders/find-orders-corte-actual.service';
import { TipoTransacciones } from 'src/app/utilities/tipo_transacciones';

@Component({
  selector: 'app-section-transacciones',
  templateUrl: './section-transacciones.component.html',
  styleUrls: ['./section-transacciones.component.css']
})
export class SectionTransaccionesComponent {
  ventas = liveQuery(()=>this.getCurrentOrders(TipoTransacciones.Venta));
  devoluciones = liveQuery(()=>this.getCurrentOrders(TipoTransacciones.Devolucion));
  otrosIngresos = liveQuery(()=>this.getCurrentOrders(TipoTransacciones.OtrosIngresos));
  otrosEgresos = liveQuery(()=>this.getCurrentOrders(TipoTransacciones.OtrosEgresos));
  anulaciones = liveQuery(()=>this.getCurrentOrders(TipoTransacciones.Anulacion));
  anticipos = liveQuery(()=>this.getCurrentOrders(TipoTransacciones.AnticiposOrden));
  
  constructor(private findOrders: FindOrdersCorteActualService) { }

  async getCurrentOrders(type : string){
    return this.findOrders.find(type);
  }


}
