import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { liveQuery } from 'dexie';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent {

  authUser = liveQuery(() => this.user());

  constructor(private auth : AuthService, public router : Router){}

  async user(){
    return await this.auth.user();
  }

  async logout(){
    await this.auth.logout();
    this.router.navigate(['login']);
  }
}
