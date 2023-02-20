import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { liveQuery } from 'dexie';
import { AuthService } from 'src/app/services/auth/auth.service';
import { db } from 'src/app/storage/db';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  authUser = liveQuery(() => this.user());

  constructor(private auth: AuthService, public router: Router) { }

  async user() {
    return await this.auth.user();
  }

  async logout() {
    await this.auth.logout();
    this.router.navigate(['login']);
  }


  async resetDatabase(){
    await db.resetDatabase();
  }
}
