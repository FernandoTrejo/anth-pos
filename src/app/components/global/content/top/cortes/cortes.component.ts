import { Component } from '@angular/core';
import { liveQuery } from 'dexie';
import { FindActiveCorteDiarioService } from 'src/app/services/cortes/corte-diario/find-active-corte-diario.service';
import { FindActiveCorteParcialService } from 'src/app/services/cortes/corte-parcial/find-active-corte-parcial.service';
import { FindTransactionsByCorteService } from 'src/app/services/orders/find-transactions-by-corte.service';
import { Status } from 'src/app/utilities/status';

@Component({
  selector: 'app-cortes',
  templateUrl: './cortes.component.html',
  styleUrls: ['./cortes.component.css']
})
export class CortesComponent {
  corteParcial = liveQuery(() => this.findCorteParcial());
  corteDiario = liveQuery(() => this.activeCorteDiario.find());

  transaccionesAbiertas = liveQuery(() => this.findTransaccionesAbiertas());
  hayTransaccionesAbiertas = true;
  constructor(
    private activeCorteParcial: FindActiveCorteParcialService,
    private activeCorteDiario: FindActiveCorteDiarioService,
    private findTransaccionesCorte : FindTransactionsByCorteService) {

  }

  async findTransaccionesAbiertas(){
    const corteParcial = await this.activeCorteParcial.find();
    if(!corteParcial){
      return [];
    }
    const transacciones = await this.findTransaccionesCorte.getByCorteParcial(corteParcial.codigo);
    const abiertas = transacciones.filter(transaccion => transaccion.status == Status.Open);
    console.log(abiertas);
    if(abiertas.length > 0){
      this.hayTransaccionesAbiertas = true;
    }else{
      this.hayTransaccionesAbiertas = false;
    }
    return abiertas;
  }

  async findCorteParcial() {
    return await this.activeCorteParcial.find();
  }

}
