import { Component } from '@angular/core';
import { liveQuery } from 'dexie';
import { FindActiveCorteParcialService } from 'src/app/services/cortes/corte-parcial/find-active-corte-parcial.service';
import { formatDate } from 'src/app/utilities/date';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent {
  fecha = formatDate(new Date());
  corteParcial = liveQuery(() => this.findCorteParcial());
  constructor(private activeCorteParcial : FindActiveCorteParcialService){

  }

  async findCorteParcial(){
    return await this.activeCorteParcial.find();
  }
}
