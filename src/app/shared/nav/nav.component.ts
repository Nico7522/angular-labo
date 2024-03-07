import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { ModalService } from '../../services/modal.service';
import { SnackbarService } from '../../services/snackbar.service';
import { TokenService } from '../../services/token.service';
import { LoginComponent } from '../../user/login/login.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent implements OnInit {
  isOpen!: boolean;
  isTokenExist!: boolean;
  isCartVisible!: boolean;

  constructor(
    private _modalService: ModalService,
    rend: Renderer2,
    private _tokenService: TokenService,
    private _snackbarService: SnackbarService,
    private _cartService: CartService,
    private _router: Router
  ) {
    rend.listen('window', 'click', (e: Event) => {
      if (this.isOpen) {
        this.sidenav.close();
      }
    });
  }
  ngOnInit(): void {
    this._tokenService.$token.subscribe((token) => (this.isTokenExist = token));
    this._cartService.$isVisible.subscribe(isVisible => this.isCartVisible = isVisible)
  }

  @ViewChild('sidenav') sidenav!: MatSidenav;
  openModal() {
    this._modalService.openModal(LoginComponent, '400ms', '400ms');
  }

  toggleCart() {
    this.isCartVisible = !this.isCartVisible;
    this._cartService.toggleCart(this.isCartVisible);
  }

  clickHandler() {
    this.sidenav.close();
  }
  clickHandlerLogin() {
    this.openModal();
    this.sidenav.close();
  }

  toggleMenu() {
    this.sidenav.toggle();
  }

  logout() {
    localStorage.removeItem('token');
    this._tokenService.emitTokenExist();
    this._snackbarService.openSnackBar("Déconnecté !")
      this._router.navigate(['/']);
  }

  isAdmin(): boolean {
    if(this._tokenService.isTokenExist) {
      if(this._tokenService.decodeToken().role === "Admin") {
        return true
      }
    }
    return false
  }
}
