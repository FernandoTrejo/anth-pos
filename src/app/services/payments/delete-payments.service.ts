import { Injectable } from '@angular/core';
import { db } from 'src/app/storage/db';

@Injectable({
  providedIn: 'root'
})
export class DeletePaymentsService {

  constructor() { }

  async delete(paymentId : number){
    await db.pagosOrden.delete(paymentId);
  }
}
