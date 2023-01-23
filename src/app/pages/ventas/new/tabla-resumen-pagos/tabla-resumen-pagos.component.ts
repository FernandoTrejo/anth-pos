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
  pendiente = liveQuery(() => this.calculatePending());
  vuelto = liveQuery(() => this.calculateVuelto());

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

    let difference = (Number(tot) - Number(rec)).toFixed(2);
    if(Number(difference) < 0){
      return 0;
    }

    return Number(difference);
  }

  async calculateVuelto(){
    const tot = await this.calculateTotal();
    const rec = await this.calculateReceived();

    let difference = (Number(tot) - Number(rec)).toFixed(2);
    if(Number(difference) < 0){
      return Math.abs(Number(difference));
    }

    return 0;
  }

}
