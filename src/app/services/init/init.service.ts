import { Injectable } from '@angular/core';
import { OpenCorteDiarioService } from '../cortes/corte-diario/open-corte-diario.service';
import { OpenCorteMensualService } from '../cortes/corte-mensual/open-corte-mensual.service';
import { OpenCorteParcialService } from '../cortes/corte-parcial/open-corte-parcial.service';

@Injectable({
  providedIn: 'root'
})
export class InitService {

  constructor(
    private corteMensual: OpenCorteMensualService,
    private corteDiario: OpenCorteDiarioService,
    private corteParcial : OpenCorteParcialService
  ) { }

  async init(){
    await this.corteMensual.open();
    await this.corteDiario.open();
    await this.corteParcial.open();
  }
}
