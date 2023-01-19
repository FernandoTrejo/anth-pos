import { Component, OnInit } from '@angular/core';
import { liveQuery } from 'dexie';
import { CalculateTotalOrderService } from 'src/app/services/orders/added-products/calculate-total-order.service';
import { CalculateTotalReceivedService } from 'src/app/services/payments/calculate-total-received.service';

@Component({
  selector: 'app-tabla-resumen-pagos',
  templateUrl: './tabla-resumen-pagos.component.html',
  styleUrls: ['./tabla-resumen-pagos.component.css']
})
export class TablaResumenPagosComponent{
  // HARDCODE
  orderCode = '123456';

  total = liveQuery(() => this.calculateTotal());
  recibido = liveQuery(() => this.calculateReceived());
  pendiente = liveQuery(() => this.calculatePending())

  constructor(private totalCalculatorService : CalculateTotalOrderService, private totalReceivedService: CalculateTotalReceivedService){}

  async calculateTotal(){
    return await this.totalCalculatorService.calculate(this.orderCode);
  }

  async calculateReceived(){
    return await this.totalReceivedService.calculate(this.orderCode);
  }

  async calculatePending(){
    const tot = await this.calculateTotal();
    const rec = await this.calculateReceived();
    return (Number(tot) - Number(rec)).toFixed(2);
  }

}
