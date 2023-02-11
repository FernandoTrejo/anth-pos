import { Component } from '@angular/core';
import { liveQuery } from 'dexie';
import { FindActiveCorteParcialService } from 'src/app/services/cortes/corte-parcial/find-active-corte-parcial.service';
import { InitService } from 'src/app/services/init/init.service';
import { formatDate } from 'src/app/utilities/date';

@Component({
  selector: 'app-btn-apertura-caja',
  templateUrl: './btn-apertura-caja.component.html',
  styleUrls: ['./btn-apertura-caja.component.css']
})
export class BtnAperturaCajaComponent {
  fecha = formatDate(new Date());

  constructor(
    private init : InitService
    ){}

  async AbrirCaja(){
    await this.init.init();
  }

}
