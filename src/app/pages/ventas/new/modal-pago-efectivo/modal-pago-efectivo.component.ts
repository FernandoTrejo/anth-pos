import { Component, Input } from '@angular/core';
import { liveQuery } from 'dexie';
import { NotifyService } from 'src/app/services/Notifications/notify.service';
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
  vuelto: number = 0;
  restante = liveQuery(() => this.getRemaining());
  tipoPago = 'efectivo';
  emisor = '';

  constructor(private storePaymentService: StorePaymentInOrderService, private remainingCalculator : CalculateRemainingService,
    private notifier : NotifyService) { }

  async storePayment() {
    if (this.cantidad <= 0) {
      this.notifier.error('No se ha agregado ningun producto');
      return;
    }

    const payment : Pago = {
      tipo_pago: this.tipoPago,
      emisor: this.emisor,
      recibido: this.cantidad,
      codigo_orden: this.codigoVenta,
      numero_autorizacion: '',
      numero_telefono: '',
      ultimos_digitos_tarjeta: '',
      vuelto: this.vuelto
    }

    const response = await this.storePaymentService.store(payment);
    this.notifier.show(response.type, response.title);
  }

  async getRemaining(){
    return await this.remainingCalculator.calculate(this.codigoVenta);
  }

  async setExact(){
    this.cantidad = Number(await this.remainingCalculator.calculate(this.codigoVenta));
  }

  async setPayment(quantity : number | string){
    this.cantidad  = Number(quantity);
    this.vuelto = await this.calculateVuelto();
    console.log(this.vuelto);
  }

  async calculateVuelto(){
    const res = await this.getRemaining();
    const diferencia = Number(res) - Number(this.cantidad);
    if(Number(diferencia) < 0){
      return Math.abs(Number(diferencia));
    }
    return 0;
  }
}
