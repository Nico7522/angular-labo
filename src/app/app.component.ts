import { Component, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { CartService } from './services/cart.service';
import { SidemenuService } from './services/sidemenu.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

constructor(private _cartService: CartService){}
isCartVisible: boolean = false
  ngOnInit(): void {
    this._cartService.$isVisible.subscribe(isVisible => this.isCartVisible = isVisible)
  }
  title = 'angular-labo';
}
