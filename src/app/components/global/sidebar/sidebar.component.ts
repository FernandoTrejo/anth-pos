import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { liveQuery } from 'dexie';
import { Observable } from 'rxjs';
import { ActiveNav, NavItemActivatorService } from 'src/app/services/app/nav-item-activator.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { db } from 'src/app/storage/db';
import { getLinkList } from 'src/app/utilities/link_list';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  authUser = liveQuery(() => this.user());

  links = getLinkList();

  activeLink$: Observable<ActiveNav>;

  constructor(private auth: AuthService, public router: Router, private activeNavService: NavItemActivatorService) {
    this.activeLink$ = this.activeNavService.sharingObservable;
  }

  async user() {
    return await this.auth.user();
  }

  async logout() {
    await this.auth.logout();
    this.router.navigate(['login']);
  }

  changeActiveLink(newLink : string){
    const nav = {
      link: newLink
    };

    this.activeNavService.sharingObservableData = nav;
  }

}
