import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(public router: Router, public auth : AuthService) { }

  async canActivate(): Promise<boolean> {
    const authenticated = await this.auth.isAuthenticated();
    if (!authenticated) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
