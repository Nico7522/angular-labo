import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as jwt_decode from 'jwt-decode';
import { UserInfo } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }


  // Check si le token est présent dans le localstorage.
  get isTokenExist(): boolean {
    return localStorage.getItem('token') != undefined;
  }

  // Observable pour indiquer si le token est présent ou non.
  private _$token: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isTokenExist);
  $token = this._$token.asObservable();

  // Emet une nouvelle valeur à l'observable.
  emitTokenExist() {
    this._$token.next(this.isTokenExist)
  }

  decodeToken(): UserInfo {
    let token: string = localStorage.getItem('token') ?? '';
    let jwt: any
    if(token !== "") {
      jwt  = jwt_decode.jwtDecode(token);
    }

    return {
      id: jwt['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid'],
      fullName:
        jwt['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname'],
      role: jwt['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
      tokenLimitDate: jwt['http://schemas.microsoft.com/ws/2008/06/identity/claims/expiration']
    }
  }


}
