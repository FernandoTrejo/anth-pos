import { Component, Input } from '@angular/core';



export interface BreadcrumbItem{
  title: string;
  link: string
}


@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})

export class BreadcrumbComponent {
  @Input() items : Array<BreadcrumbItem> = [];
}
