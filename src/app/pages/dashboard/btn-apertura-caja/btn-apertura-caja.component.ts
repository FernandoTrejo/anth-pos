import { Component } from '@angular/core';
import { liveQuery } from 'dexie';
import { ValidateDateService } from 'src/app/services/cortes/corte-diario/validate-date.service';
import { FindActiveCorteParcialService } from 'src/app/services/cortes/corte-parcial/find-active-corte-parcial.service';
import { InitService } from 'src/app/services/init/init.service';
import { NotifyService } from 'src/app/services/Notifications/notify.service';
import { formatDate } from 'src/app/utilities/date';

@Component({
  selector: 'app-btn-apertura-caja',
  templateUrl: './btn-apertura-caja.component.html',
  styleUrls: ['./btn-apertura-caja.component.css']
})
export class BtnAperturaCajaComponent {
  fecha = formatDate(new Date());

  constructor(
    private init : InitService,
    private validation : ValidateDateService,
    private notifier : NotifyService

    ){}

  async AbrirCaja(){
    if(await this.validation.validate(new Date())){
      await this.init.init();
    }else{
      this.notifier.error('Ya se aperturó la caja con esta fecha');
    }
  }

}
