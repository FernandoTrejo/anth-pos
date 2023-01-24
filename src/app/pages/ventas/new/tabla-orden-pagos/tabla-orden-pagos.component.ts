import { Component, Input } from '@angular/core';
import { liveQuery } from 'dexie';
import { DeletePaymentsService } from 'src/app/services/payments/delete-payments.service';
import { FindPaymentsService } from 'src/app/services/payments/find-payments.service';

@Component({
  selector: 'app-tabla-orden-pagos',
  templateUrl: './tabla-orden-pagos.component.html',
  styleUrls: ['./tabla-orden-pagos.component.css']
})
export class TablaOrdenPagosComponent {

  @Input() codigoVenta : string = '';
  pagos = liveQuery(() => this.getPayments());

  constructor(private findPaymentsService: FindPaymentsService, private deletePaymentService: DeletePaymentsService) { }

  async getPayments() {
    return await this.findPaymentsService.getPaymentsByOrderCode(this.codigoVenta);
  }

  async deletePayment(paymentId?: number) {
    if (paymentId != null) {
      await this.deletePaymentService.delete(paymentId);
    }
  }
}
