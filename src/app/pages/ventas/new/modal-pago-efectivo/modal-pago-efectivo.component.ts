import { Component, Input } from '@angular/core';
import { liveQuery } from 'dexie';
import { CalculateRemainingService } from 'src/app/services/payments/calculate-remaining.service';
import { StorePaymentInOrderService } from 'src/app/services/payments/store-payment-in-order.service';
import { Pago } from 'src/app/storage/schema/pagos/pagos';

@Component({
  selector: 'app-modal-pago-efectivo',
  templateUrl: './modal-pago-efectivo.component.html',
  styleUrls: ['./modal-pago-efectivo.component.css']
})
export class ModalPagoEfectivoComponent {
  @Input() codigoVenta : string = '';
  cantidad: number = 0;
  restante = liveQuery(() => this.getRemaining());
  tipoPago = 'efectivo';
  emisor = '';

  constructor(private storePaymentService: StorePaymentInOrderService, private remainingCalculator : CalculateRemainingService) { }

  async storePayment() {
    if (this.cantidad <= 0) {
      console.log(this.cantidad);
      return;
    }

    const payment : Pago = {
      tipo_pago: this.tipoPago,
      emisor: this.emisor,
      recibido: this.cantidad,
      codigo_orden: this.codigoVenta
    }

    await this.storePaymentService.store(payment);
  }

  async getRemaining(){
    return await this.remainingCalculator.calculate(this.codigoVenta);
  }

  async setExact(){
    this.cantidad = Number(await this.remainingCalculator.calculate(this.codigoVenta));
  }
}
