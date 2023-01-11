import { Component, OnInit } from '@angular/core';
import { liveQuery } from 'dexie';
import { db } from './storage/db';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  transacciones$ = liveQuery(() => db.transacciones.toArray());
  title = 'anth-pos';

  async resetDatabase(){
    await db.resetDatabase();
  }
}
