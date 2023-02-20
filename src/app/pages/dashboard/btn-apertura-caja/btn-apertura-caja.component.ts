import { Component } from '@angular/core';
import { liveQuery } from 'dexie';
import { ValidateDateService } from 'src/app/services/cortes/corte-diario/validate-date.service';
import { FindActiveCorteParcialService } from 'src/app/services/cortes/corte-parcial/find-active-corte-parcial.service';
import { InitService } from 'src/app/services/init/init.service';
import { NotifyService } from 'src/app/services/Notifications/notify.service';
import { formatDate } from 'src/app/utilities/date';
import Swal from 'sweetalert2';

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

  async showConfirmation(){
    Swal.fire({
      title: '¿Desea abrir caja con fecha ' + this.fecha + '?',
      text: 'Aperturar caja con fecha ' + this.fecha,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
      confirmButtonText: 'Si'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await this.AbrirCaja();
      } 

    });
  }

}
