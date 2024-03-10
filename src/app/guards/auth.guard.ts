import { inject } from '@angular/core';
import {  CanActivateFn, Router } from '@angular/router';
import { ModalService } from '../services/modal.service';
import { TokenService } from '../services/token.service';
import { LoginComponent } from '../user/login/login.component';

export const AuthGuard: CanActivateFn = (route, state) => {
  let modalService = inject(ModalService);
  let tokenService = inject(TokenService);
  let router = inject(Router)
  if (!tokenService.isTokenExist) {
    router.navigate(['/']);
    modalService.openModal(LoginComponent, '200ms', '200ms');
    return false;
  }
  return true;
};
