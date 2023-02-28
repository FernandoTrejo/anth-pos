import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ActiveNav{
  link: string;
}

@Injectable({
  providedIn: 'root'
})


export class NavItemActivatorService {

  private data : BehaviorSubject<ActiveNav> = new BehaviorSubject<ActiveNav>({link: 'dashboard'});
  constructor() { }

  get sharingObservable(){
    return this.data.asObservable();
  }

  set sharingObservableData(data : ActiveNav){
    this.data.next(data);
  }
}
