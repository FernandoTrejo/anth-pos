import { Component, Input } from '@angular/core';
import { StorePaymentInOrderService } from 'src/app/services/payments/store-payment-in-order.service';
import { Pago } from 'src/app/storage/schema/pagos/pagos';

@Component({
  selector: 'app-modal-pago-efectivo',
  templateUrl: './modal-pago-efectivo.component.html',
  styleUrls: ['./modal-pago-efectivo.component.css']
})
export class ModalPagoEfectivoComponent {
  cantidad: number = 0;

  constructor(private storePaymentService: StorePaymentInOrderService) { }

  async storePayment() {
    if (this.cantidad <= 0) {
      return;
    }

    console.log(this.cantidad, " la cantidad esta bien");
    // HARDCODE
    const payment : Pago = {
      tipo_pago: 'Efectivo',
      emisor: '',
      recibido: this.cantidad,
      codigo_orden: '123456'
    }

    await this.storePaymentService.store(payment);
  }
}
