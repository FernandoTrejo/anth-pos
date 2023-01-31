import { Component } from '@angular/core';
import { liveQuery } from 'dexie';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent {

  authUser = liveQuery(() => this.user());

  constructor(private auth : AuthService){}

  async user(){
    return await this.auth.user();
  }
}
