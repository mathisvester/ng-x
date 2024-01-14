import { inject, Injectable } from '@angular/core';
import { Models } from 'appwrite';
import { Source, toSource } from '@state-adapt/rxjs';
import { concatMap } from 'rxjs';
import { adapt } from '@state-adapt/angular';
import { authAdapter } from './auth.adapter';
import { AuthService } from './auth.service';

export interface AuthState {
  user: Models.User<any> | null;
}

export const initialState: AuthState = {
  user: null,
};

@Injectable({ providedIn: 'root' })
export class AuthStore {
  readonly login$ = new Source<{ email: string; password: string }>(
    '[Auth] Login'
  );
  readonly register$ = new Source<{
    email: string;
    password: string;
    name: string;
  }>('[Auth] Register');
  readonly logout$ = new Source<void>('[Auth] Logout');

  private readonly authService = inject(AuthService);

  private readonly accountCreateEmailSession$ = this.login$.pipe(
    concatMap(({ payload }) =>
      this.authService.login(payload.email, payload.password)
    ),
    toSource('[Auth API] Login success')
  );

  private readonly accountCreate$ = this.register$.pipe(
    concatMap(({ payload }) =>
      this.authService.register(payload.email, payload.password, payload.name)
    ),
    toSource('[Auth API] Registration success')
  );

  private readonly accountDeleteSession$ = this.logout$.pipe(
    concatMap(() => this.authService.logout()),
    toSource('[Auth] Logout success')
  );

  private store = adapt(initialState, {
    adapter: authAdapter,
    sources: {
      loginSuccess: this.accountCreateEmailSession$,
      registrationSuccess: this.accountCreate$,
      logoutSuccess: this.accountDeleteSession$,
    },
  });

  readonly user$ = this.store.user$;
}
