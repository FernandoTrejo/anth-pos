import { Component, ElementRef, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { liveQuery } from 'dexie';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CloseCorteParcialService } from 'src/app/services/cortes/corte-parcial/close-corte-parcial.service';
import { NotifyService } from 'src/app/services/Notifications/notify.service';
import { GetAllowedPaymentTypesService } from 'src/app/services/payments/get-allowed-payment-types.service';
import { CorteTipoPago, TipoCorte } from 'src/app/storage/schema/cortes/cortes_tipo_pagos';
import { MessageType } from 'src/app/utilities/messages';

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
    private notifier : NotifyService,
    private auth : AuthService,
    private router : Router
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

    if(response.type == MessageType.success){
      await this.auth.logout();
      this.router.navigate(['login']);
    }
  }
}
