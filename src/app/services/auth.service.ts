import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError } from 'rxjs';
import { api } from '../../../environement/environement'
import { LoginForm, RegisterForm, TokenResponse } from '../models/auth.model';
import { TokenService } from './token.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private _httpClient: HttpClient,
    private _tokenService: TokenService
  ) {}

  login(userForm: LoginForm): Observable<TokenResponse> {
    return this._httpClient
      .post<TokenResponse>(`${api.url}/auth/login`, userForm)
      .pipe(
        map((res) => {
          localStorage.setItem('token', res.token);
          this._tokenService.emitTokenExist();
          return res;
        })
      );
  }

  register(registerForm: RegisterForm): Observable<TokenResponse> {
    return this._httpClient
      .post<TokenResponse>(`${api.url}/auth/register`, registerForm)
      .pipe(
        map((res) => {
          localStorage.setItem('token', res.token);
          this._tokenService.emitTokenExist();
          return res;
        })
      );
  }
}
