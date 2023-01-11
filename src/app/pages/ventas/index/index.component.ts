import { Component } from '@angular/core';
import { liveQuery } from 'dexie';
import { db } from 'src/app/storage/db';
import { Transacciones } from 'src/app/storage/schema/transacciones/transacciones';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  ventas = liveQuery(() => db.transacciones.toArray());

  formatDate(date: Date) {
    const offset = date.getTimezoneOffset()
    date = new Date(date.getTime() - (offset * 60 * 1000))
    return date.toISOString().split('T')[0]
  }
}
