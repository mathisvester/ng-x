import { inject } from '@angular/core';
import { map } from 'rxjs';
import { AuthStore } from './data-access/auth.store';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);

  return inject(AuthStore).user$.pipe(
    map(user => (!!user ? true : router.parseUrl('/login')))
  );
};
