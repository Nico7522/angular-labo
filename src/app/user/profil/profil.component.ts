import { Component, OnInit } from '@angular/core';
import { Order } from '../../models/order.model';
import { User, UserInfo } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.scss',
})
export class ProfilComponent implements OnInit {
  userId!: number;
  user!: User;
  order!: Order[];
  orderDisplay: boolean = false;
  panelOpenState = false;
  constructor(
    private _tokenService: TokenService,
    private _userService: UserService
  ) {}
  ngOnInit(): void {
    this.userId = this._tokenService.decodeToken().id;

    this._userService.GetById(this.userId).subscribe({
      next: (user) => {
        this.user = user;
      },
      error: (err) => console.log(err),
    });
  }

  getOrders() {
    this.orderDisplay = !this.orderDisplay;
    if (this.orderDisplay) {
      this. _userService.getOrders(this.userId).subscribe({
        next: (orders) => this.order = orders
      }
      )
      
    }
  }
  displayedColumns: string[] = ['quantity', 'modelName', 'price'];

}
