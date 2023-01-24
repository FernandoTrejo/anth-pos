import { Component } from '@angular/core';
import { liveQuery } from 'dexie';
import { FindOrdersCorteActualService } from 'src/app/services/orders/find-orders-corte-actual.service';
import { TipoTransacciones } from 'src/app/utilities/tipo_transacciones';

@Component({
  selector: 'app-card-resumen-ventas',
  templateUrl: './card-resumen-ventas.component.html',
  styleUrls: ['./card-resumen-ventas.component.css']
})
export class CardResumenVentasComponent {
  numeroVentas = liveQuery(() => this.getNumeroVentas());
  totalVentas = liveQuery(() => this.getTotalVentas());

  constructor(private findCurrentOrders : FindOrdersCorteActualService){}

  async getNumeroVentas(){
    const ventas = await this.findCurrentOrders.find(TipoTransacciones.Venta);
    return ventas.length;
  }

  async getTotalVentas(){
    const ventas = await this.findCurrentOrders.find(TipoTransacciones.Venta);
    let total = 0;
    for(let venta of ventas){
      total += Number(venta.total);
    }
    return Number(total).toFixed(2);
  }
}
