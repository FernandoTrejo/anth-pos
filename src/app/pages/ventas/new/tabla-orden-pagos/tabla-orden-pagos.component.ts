import { Component } from '@angular/core';
import { liveQuery } from 'dexie';
import { DeletePaymentsService } from 'src/app/services/payments/delete-payments.service';
import { FindPaymentsService } from 'src/app/services/payments/find-payments.service';

@Component({
  selector: 'app-tabla-orden-pagos',
  templateUrl: './tabla-orden-pagos.component.html',
  styleUrls: ['./tabla-orden-pagos.component.css']
})
export class TablaOrdenPagosComponent {


  //HARDCODE
  pagos = liveQuery(() => this.getPayments('123456'));

  constructor(private findPaymentsService: FindPaymentsService, private deletePaymentService: DeletePaymentsService) { }

  async getPayments(orderCode: string) {
    return await this.findPaymentsService.getPaymentsByOrderCode(orderCode);
  }

  async deletePayment(paymentId?: number) {
    if (paymentId != null) {
      await this.deletePaymentService.delete(paymentId);
    }
  }
}
