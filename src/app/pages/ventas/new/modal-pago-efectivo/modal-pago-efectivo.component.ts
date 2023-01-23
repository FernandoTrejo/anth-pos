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
  cantidad: number = 0;
  restante = liveQuery(() => this.getRemaining());

  constructor(private storePaymentService: StorePaymentInOrderService, private remainingCalculator : CalculateRemainingService) { }

  async storePayment() {
    if (this.cantidad <= 0) {
      return;
    }

    // HARDCODE
    const payment : Pago = {
      tipo_pago: 'Efectivo',
      emisor: '',
      recibido: this.cantidad,
      codigo_orden: '123456'
    }

    await this.storePaymentService.store(payment);
  }

  async getRemaining(){
    // HARDCODE
    return await this.remainingCalculator.calculate('123456');
  }

  async setExact(){
    this.cantidad = Number(await this.remainingCalculator.calculate('123456'));
  }
}
