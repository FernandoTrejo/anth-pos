import { Component } from '@angular/core';
import { BreadcrumbItem } from 'src/app/components/global/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent {
    breadcrumbItems : Array<BreadcrumbItem> = [
      {
        title: 'Transacciones',
        link: ''
      },
      {
        title: 'Ventas',
        link: '/ventas'
      },
      {
        title: 'Nueva',
        link: ''
      }
    ];
    
}
