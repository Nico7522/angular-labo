import { Component, OnDestroy, OnInit } from '@angular/core';
import { Order } from '../../models/order.model';
import { User, UserInfo } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';
import { UserService } from '../../services/user.service';
import { api } from '../../../../environement/environement';
import { Subscription } from 'rxjs';
import { ModalService } from '../../services/modal.service';
import { CreateAdressComponent } from '../create-adress/create-adress.component';
import { SnackbarService } from '../../services/snackbar.service';
import { AddressService } from '../../services/adress.service';
import { ConfirmAddressDeleteComponent } from './confirm-address-delete/confirm-address-delete.component';


@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.scss',
})
export class ProfilComponent implements OnInit, OnDestroy {
  userId!: number;
  user!: User;
  canDelete: boolean = false;
  loading: boolean = true;
  order!: Order[];
  orderDisplay: boolean = false;
  panelOpenState = false;
  userSub!: Subscription;
  orderSub!: Subscription;
  imageUrl: string = api.img_url;

  constructor(
    private _tokenService: TokenService,
    private _userService: UserService,
    private _modalService: ModalService,
    private _snackbarService: SnackbarService,
    private _addressService: AddressService
  ) {}
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
    if (this.orderDisplay) {
      this.orderSub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.userId = this._tokenService.decodeToken().id;

    this.userSub = this._userService.GetById(this.userId).subscribe({
      next: (user) => {
        console.log(user);

        this.user = user;
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
      },
    });
  }

  openModal() {
    this._modalService.openModal(CreateAdressComponent, '300ms', '300ms');
  }

  getOrders() {
    this.orderDisplay = !this.orderDisplay;
    console.log(this.orderDisplay);

    if (this.orderDisplay) {
      this.orderSub = this._userService.getOrders(this.userId).subscribe({
        next: (orders) => (this.order = orders),
      });
    }
  }

  delete(addressId: number) {
    this._modalService.openModal(
      ConfirmAddressDeleteComponent,
      '0ms',
      '0ms',
      '350px',
      '200px'
    );
    this._modalService.$canDeleteAddress.subscribe({
      next: (canDelete) => {
        if (canDelete) {
          this._addressService.delete(addressId).subscribe({
            next: () => {
              this._snackbarService.openSnackBar('Adresse supprimée !');
              this.user.adresses = this.user.adresses.filter(a => {
                return a.adressId !== addressId
              })
            },
          });
        }
      },
    });
  }
}
