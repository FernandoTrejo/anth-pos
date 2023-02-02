import { Injectable } from '@angular/core';
import { Notyf } from 'notyf';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {
  notyf = new Notyf({
    duration: 4000,
    ripple: true,
    position: {x:'right',y:'top'},
    dismissible: false 
  });
  

  constructor() {
    
   }

  error(message : string){
    this.notyf.error(message);
  }
}
