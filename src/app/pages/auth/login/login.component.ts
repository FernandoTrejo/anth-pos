import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
import { NotifyService } from 'src/app/services/Notifications/notify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username : string = '';
  password : string = '';

  constructor(private loginService: LoginService, public router : Router, private notifyService : NotifyService){}

  async login(){
    const response = await this.loginService.login(this.username, this.password);
    
    if(!response){
      this.notifyService.error('Las credenciales son incorrectas');
      return;
    }

    this.router.navigate(['dashboard']);
  }
}
