import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';

export const checkAdminGuard: CanActivateFn = (route, state) => {
  let tokenService = inject(TokenService);
  let router = inject(Router);

  if (tokenService.isTokenExist) {
    if (tokenService.decodeToken().role === 'Admin') {
      return true;
    }
  }
  router.navigate(['/']);
  return false;
};
