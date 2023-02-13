import { Component } from '@angular/core';
import { liveQuery } from 'dexie';
import { BreadcrumbItem } from 'src/app/components/global/breadcrumb/breadcrumb.component';
import { FindSesionesService } from 'src/app/services/sesiones/find-sesiones.service';
import { formatDateTime } from 'src/app/utilities/date';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  breadcrumbItems : Array<BreadcrumbItem> = [
    {
      title: 'Sesiones',
      link: ''
    },
    {
      title: 'Index',
      link: ''
    }
  ];

  sesionesAuth = liveQuery(() => this.sFinder.all());

  constructor(private sFinder : FindSesionesService){}

  format(date : Date | undefined){
    if(date == undefined){
      return '';
    }
    return formatDateTime(date);
  }
}
