import { Component } from '@angular/core';
import { liveQuery } from 'dexie';
import { FindActiveCorteDiarioService } from 'src/app/services/cortes/corte-diario/find-active-corte-diario.service';
import { FindActiveCorteParcialService } from 'src/app/services/cortes/corte-parcial/find-active-corte-parcial.service';

@Component({
  selector: 'app-cortes',
  templateUrl: './cortes.component.html',
  styleUrls: ['./cortes.component.css']
})
export class CortesComponent {
  corteParcial = liveQuery(() => this.findCorteParcial());
  corteDiario = liveQuery(() => this.activeCorteDiario.find());
  constructor(
    private activeCorteParcial: FindActiveCorteParcialService,
    private activeCorteDiario: FindActiveCorteDiarioService) {

  }

  async findCorteParcial() {
    return await this.activeCorteParcial.find();
  }
}
