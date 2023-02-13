import { Component, ElementRef, ViewChildren } from '@angular/core';
import { liveQuery } from 'dexie';
import { CloseCorteDiarioService } from 'src/app/services/cortes/corte-parcial/close-corte-diario.service';
import { NotifyService } from 'src/app/services/Notifications/notify.service';
import { GetAllowedPaymentTypesService } from 'src/app/services/payments/get-allowed-payment-types.service';
import { CorteTipoPago, TipoCorte } from 'src/app/storage/schema/cortes/cortes_tipo_pagos';

@Component({
  selector: 'app-corte-diario-modal',
  templateUrl: './corte-diario-modal.component.html',
  styleUrls: ['./corte-diario-modal.component.css']
})
export class CorteDiarioModalComponent {
  @ViewChildren('cortesValues') cortesValues = [];
  tiposPagos = liveQuery(() => this.getPayments());
  constructor(private paymentTypesFinder: GetAllowedPaymentTypesService,
    private zCloser : CloseCorteDiarioService,
    private notifier : NotifyService
    ) { }

  async getPayments() {
    return await this.paymentTypesFinder.get();
  }

  async store() {
    const corteDiarioPagos: CorteTipoPago[] = [];
    this.cortesValues.forEach((x: ElementRef) => {
      const cantidad: number = Number(x.nativeElement.value);
      const codigoPago: string = (x.nativeElement.name);

      corteDiarioPagos.push({
        monto: cantidad,
        codigo_tipo_pago: codigoPago,
        tipo: TipoCorte.Diario,
        fecha: new Date()
      });
    });

    const response = await this.zCloser.close(corteDiarioPagos);
    this.notifier.show(response.type, response.title);
  }
}
