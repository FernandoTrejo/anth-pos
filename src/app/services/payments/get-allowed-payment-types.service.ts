import { Injectable } from '@angular/core';
import { db } from 'src/app/storage/db';
import { TipoPagoPermitido } from 'src/app/storage/schema/pagos/tipos_pago';

@Injectable({
  providedIn: 'root'
})
export class GetAllowedPaymentTypesService {

  constructor() { }

  async get() : Promise<Array<TipoPagoPermitido> | null> {
    try {
      const paymentTypes = await db.tiposPagoPermitido.toArray();
      return paymentTypes;
    } catch (e) {
      return null;
    }
  }
}
