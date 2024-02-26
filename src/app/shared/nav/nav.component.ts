import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ModalService } from '../../services/modal.service';
import { SidemenuService } from '../../services/sidemenu.service';
import { LoginComponent } from '../../user/login/login.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent{
  isOpen!: boolean;
  constructor(private _modalService: ModalService, private _sideMenuService: SidemenuService, rend: Renderer2){
    
    rend.listen('window', 'click',(e:Event)=>{
      if(this.isOpen) {
        this.sidenav.close();
      }
  })
}
  @ViewChild('sidenav') sidenav!: MatSidenav;
  openModal(){
    this._modalService.openModal(LoginComponent, '0ms', '0ms');
  }

  clickHandler() {
    this.sidenav.close();

  }
  clickHandlerLogin(){
    this.openModal();
    this.sidenav.close();

  }

  toggleMenu() {
    this.sidenav.toggle()
  }

}
