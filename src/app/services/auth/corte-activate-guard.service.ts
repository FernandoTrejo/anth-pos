import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FindActiveCorteParcialService } from '../cortes/corte-parcial/find-active-corte-parcial.service';
import { NotifyService } from '../Notifications/notify.service';
import { AuthGuardService } from './auth-guard.service';

@Injectable({
  providedIn: 'root'
})
export class CorteActivateGuardService implements CanActivate{

  constructor(
    private AuthGuard : AuthGuardService, 
    private corteX : FindActiveCorteParcialService,
    private notifier : NotifyService,
    private router : Router
    ) { }

  async canActivate(): Promise<boolean>  {
    const isAuth = await this.AuthGuard.canActivate();
    if(!isAuth){
      return false;
    }

    const corteParcial = await this.corteX.find();
    if(!corteParcial){
      this.notifier.error('No se ha aperturado la caja');
      this.router.navigate(['dashboard']);
      return false;
    }

    return true;
  }
}
