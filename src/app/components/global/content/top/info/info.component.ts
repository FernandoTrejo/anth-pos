import { Component } from '@angular/core';
import { formatDate } from 'src/app/utilities/date';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent {
fecha = formatDate(new Date());
}
