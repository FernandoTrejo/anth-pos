import { Component } from '@angular/core';
import { liveQuery } from 'dexie';
import { BreadcrumbItem } from 'src/app/components/global/breadcrumb/breadcrumb.component';
import { FindCortesRegistradosService } from 'src/app/services/cortes/find-cortes-registrados.service';
import { formatDateTime } from 'src/app/utilities/date';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  breadcrumbItems : Array<BreadcrumbItem> = [
    {
      title: 'Cortes',
      link: ''
    },
    {
      title: 'Index',
      link: ''
    }
  ];

  cortes = liveQuery(() => this.corteFinder.all());

  constructor(private corteFinder : FindCortesRegistradosService){}

  format(date : Date){
    return formatDateTime(date);
  }

}
