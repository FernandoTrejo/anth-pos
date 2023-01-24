import { Component } from '@angular/core';
import { FindActiveCorteDiarioService } from 'src/app/services/cortes/corte-diario/find-active-corte-diario.service';
import { OpenCorteDiarioService } from 'src/app/services/cortes/corte-diario/open-corte-diario.service';
import { FindActiveCorteMensualService } from 'src/app/services/cortes/corte-mensual/find-active-corte-mensual.service';
import { OpenCorteMensualService } from 'src/app/services/cortes/corte-mensual/open-corte-mensual.service';
import { FindActiveCorteParcialService } from 'src/app/services/cortes/corte-parcial/find-active-corte-parcial.service';
import { OpenCorteParcialService } from 'src/app/services/cortes/corte-parcial/open-corte-parcial.service';

@Component({
  selector: 'app-section-cortes',
  templateUrl: './section-cortes.component.html',
  styleUrls: ['./section-cortes.component.css']
})
export class SectionCortesComponent {
  constructor(
    private corteMensual: OpenCorteMensualService,
    private corteDiario: OpenCorteDiarioService,
    private corteParcial : OpenCorteParcialService
  ) { }

  async openCorteMensual() {
    await this.corteMensual.open();
  }

  async openCorteDiario() {
    await this.corteDiario.open();
  }

  async openCorteParcial() {
    await this.corteParcial.open();
  }
}
