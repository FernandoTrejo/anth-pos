import { Injectable } from '@angular/core';
import { db } from 'src/app/storage/db';
import { Pago } from 'src/app/storage/schema/pagos/pagos';

@Injectable({
  providedIn: 'root'
})
export class FindTotalByTypeService {

  constructor() { }

  async calculateX(type: string, codigoCorteX: string): Promise<number> {
    let totalCalculated: number = 0;
    const transactions = await db.transacciones.where(
      { corte_parcial: codigoCorteX }
    ).toArray();

    for (let transaccion of transactions) {
      const pagosTransaccion = await db.pagosOrden.where({
        codigo_orden: transaccion.codigo
      }).toArray();

      let total = 0;
      for (let pago of pagosTransaccion) {
        if (pago.tipo_pago == type) {
          total += (Number(pago.recibido) - Number((pago.vuelto) ? pago.vuelto : 0));
        }
      }

      totalCalculated += Number(total);
    }

    console.log(`El total de esta transaccion es ${totalCalculated}`);
    return totalCalculated;
  }
}
