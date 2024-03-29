import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  editEmail(email: string, userId: number) : Observable<any> {
    return this._httpClient.patch(`${api.url}/auth/${userId}/update/email`,  {email}, {responseType: 'text'})
  }

  resetPassword(password: string, id: number) : Observable<boolean> {
    return this._httpClient.patch<boolean>(`${api.url}/auth/${id}/update/password`, {password})
  }

  requestResetPassword(email: string): Observable<boolean>  {
    return this._httpClient.post<boolean>(`${api.url}/auth/reset/password`, {email})
  }
}
