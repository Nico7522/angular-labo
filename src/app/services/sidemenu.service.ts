import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidemenuService {
  clicked: boolean = false;
  $clicked: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.clicked)
  constructor() { }

  onMenuToggled(isOpen: boolean){
    this.$clicked.next(isOpen)
    
  }
}
