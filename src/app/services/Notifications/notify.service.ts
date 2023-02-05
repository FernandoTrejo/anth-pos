import { Injectable } from '@angular/core';
import { Notyf } from 'notyf';
import { MessageType } from 'src/app/utilities/messages';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {
  notyf = new Notyf({
    duration: 4000,
    ripple: true,
    position: { x: 'right', y: 'top' },
    dismissible: false
  });


  constructor() {

  }

  show(type : MessageType, message : string){
    switch(type){
      case MessageType.error:
        this.error(message);
        break;
      case MessageType.success:
        this.success(message);
        break;
    }
  }

  error(message: string) {
    this.notyf.error(message);
  }

  success(message: string) {
    this.notyf.success(message);
  }
}
