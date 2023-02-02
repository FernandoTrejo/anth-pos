import { Component, Input } from '@angular/core';
import { liveQuery } from 'dexie';
import { CalculateRemainingService } from 'src/app/services/payments/calculate-remaining.service';
import { StorePaymentInOrderService } from 'src/app/services/payments/store-payment-in-order.service';
import { Pago } from 'src/app/storage/schema/pagos/pagos';

@Component({
  selector: 'app-modal-pago-tarjeta',
  templateUrl: './modal-pago-tarjeta.component.html',
  styleUrls: ['./modal-pago-tarjeta.component.css']
})
export class ModalPagoTarjetaComponent {
  @Input() codigoVenta : string = '';
  cantidad: number = 0;
  restante = liveQuery(() => this.getRemaining());
  tipoPago = 'tarjeta';
  emisor = '';
  numeroAutorizacion = '';
  numeroTelefono = '';
  ult4Digitos = '';

  constructor(private storePaymentService: StorePaymentInOrderService, private remainingCalculator : CalculateRemainingService) { }

  async storePayment() {
    const res = await this.remainingCalculator.calculate(this.codigoVenta);
    if (res <= 0) {
      return;
    }

    const payment : Pago = {
      tipo_pago: this.tipoPago,
      emisor: this.emisor,
      recibido: Number(res),
      codigo_orden: this.codigoVenta,
      numero_autorizacion: this.numeroAutorizacion,
      numero_telefono: this.numeroTelefono,
      ultimos_digitos_tarjeta: this.ult4Digitos
    }

    await this.storePaymentService.store(payment);
  }

  async getRemaining(){
    return await this.remainingCalculator.calculate(this.codigoVenta);
  }

}
