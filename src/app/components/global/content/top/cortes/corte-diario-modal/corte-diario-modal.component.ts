import { Component, ViewChildren } from '@angular/core';
import { liveQuery } from 'dexie';
import { CloseCorteDiarioService } from 'src/app/services/cortes/corte-parcial/close-corte-diario.service';
import { NotifyService } from 'src/app/services/Notifications/notify.service';
import { GetAllowedPaymentTypesService } from 'src/app/services/payments/get-allowed-payment-types.service';

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
    
  }
}
