import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../../components/snackbar/snackbar.component';
import { ModalService } from '../../services/modal.service';
import { SidemenuService } from '../../services/sidemenu.service';
import { TokenService } from '../../services/token.service';
import { LoginComponent } from '../../user/login/login.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit{
  isOpen!: boolean;
  isTokenExist!: boolean;
  constructor(private _modalService: ModalService, private _sideMenuService: SidemenuService, rend: Renderer2, private _tokenService: TokenService,  private _snackBar: MatSnackBar){

    rend.listen('window', 'click',(e:Event)=>{
      if(this.isOpen) {
        this.sidenav.close();
      }
  })
}
  ngOnInit(): void {
    this._tokenService.$token.subscribe(token => this.isTokenExist = token)
  }
  @ViewChild('sidenav') sidenav!: MatSidenav;
  openModal(){
    this._modalService.openModal(LoginComponent, '400ms', '400ms');
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

  logout() {
    localStorage.removeItem('token');
    this._tokenService.emitTokenExist();
    this.openSnackBar();
  }

  openSnackBar() {
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: 1000,
      data: "Déconnecté !"
    });
  }

}
