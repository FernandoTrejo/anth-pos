import { Component, ElementRef, ViewChildren } from '@angular/core';
import { liveQuery } from 'dexie';
import { CloseCorteParcialService } from 'src/app/services/cortes/corte-parcial/close-corte-parcial.service';
import { NotifyService } from 'src/app/services/Notifications/notify.service';
import { GetAllowedPaymentTypesService } from 'src/app/services/payments/get-allowed-payment-types.service';
import { CorteTipoPago, TipoCorte } from 'src/app/storage/schema/cortes/cortes_tipo_pagos';

@Component({
  selector: 'app-corte-parcial-modal',
  templateUrl: './corte-parcial-modal.component.html',
  styleUrls: ['./corte-parcial-modal.component.css']
})
export class CorteParcialModalComponent {
  @ViewChildren('cortesValues') cortesValues = [];
  tiposPagos = liveQuery(() => this.getPayments());
  constructor(private paymentTypesFinder: GetAllowedPaymentTypesService,
    private xCloser : CloseCorteParcialService,
    private notifier : NotifyService
    ) { }

  async getPayments() {
    return await this.paymentTypesFinder.get();
  }

  async store() {
    const corteParcialPagos: CorteTipoPago[] = [];
    this.cortesValues.forEach((x: ElementRef) => {
      const cantidad: number = Number(x.nativeElement.value);
      const codigoPago: string = (x.nativeElement.name);

      corteParcialPagos.push({
        monto: cantidad,
        codigo_tipo_pago: codigoPago,
        tipo: TipoCorte.Parcial,
        fecha: new Date()
      });
    });

    const response = await this.xCloser.close(corteParcialPagos);
    this.notifier.show(response.type, response.title);
  }
}
