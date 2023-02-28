import { Component } from '@angular/core';
import { db } from 'src/app/storage/db';
import { getLinkList } from 'src/app/utilities/link_list';

@Component({
  selector: 'app-config-index',
  templateUrl: './config-index.component.html',
  styleUrls: ['./config-index.component.css']
})
export class ConfigIndexComponent {
  links = getLinkList();
  async resetDatabase(){
    await db.resetDatabase();
  }
}
