import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api } from '../../../environement/environement'
import { LoginForm, TokenResponse } from '../models/auth.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _httpClient: HttpClient) { }

  login(userForm: LoginForm): Observable<TokenResponse> {
   return this._httpClient.post<TokenResponse>(`${api.url}/login`, userForm)
  }

  register() {


  }

}
