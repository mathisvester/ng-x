import { inject, Injectable } from '@angular/core';
import { Models } from 'appwrite';
import {
  Source,
  splitRequestSources,
  toRequestSource,
  toSource,
} from '@state-adapt/rxjs';
import { concatMap, Observable } from 'rxjs';
import { adapt } from '@state-adapt/angular';
import { authAdapter } from './auth.adapter';
import { AuthService } from './auth.service';
import { routeDidLeave } from '../../shared/util/route-did-leave';
import { Action } from '@state-adapt/core';
import { HttpErrorResponse } from '@angular/common/http';

export interface AuthState {
  user: Models.User<any> | null;
  error: HttpErrorResponse | null;
}

export const initialState: AuthState = {
  user: null,
  error: null,
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
  private readonly loginLeave$ = routeDidLeave('/login').pipe(
    toSource('[Login] Leave')
  );
  private readonly registrationLeave$ = routeDidLeave('/registration').pipe(
    toSource('[Registration] Leave')
  );

  private readonly authService = inject(AuthService);

  private readonly accountCreateEmailSession$ = this.login$.pipe(
    concatMap(({ payload }) =>
      this.authService
        .login(payload.email, payload.password)
        .pipe(toRequestSource('[Auth API] Login'))
    )
  );

  private readonly accountCreate$ = this.register$.pipe(
    concatMap(({ payload }) =>
      this.authService
        .register(payload.email, payload.password, payload.name)
        .pipe(toRequestSource('[Auth API] Registration'))
    )
  );

  private readonly accountDeleteSession$ = this.logout$.pipe(
    concatMap(() => this.authService.logout()),
    toSource('[Auth] Logout')
  );

  private store = adapt(initialState, {
    adapter: authAdapter,
    sources: () => {
      const { success$: loginSuccess$, error$: loginFailed$ } =
        splitRequestSources(
          '[Auth API] Login',
          this.accountCreateEmailSession$
        );

      const { success$: registrationSuccess$, error$: registrationFailed$ } =
        splitRequestSources('[Auth API] Registration', this.accountCreate$);

      return {
        loginSuccess: loginSuccess$,
        loginFailed: loginFailed$ as Observable<
          Action<HttpErrorResponse, '[Auth API] Login.error$'>
        >,
        registrationSuccess: registrationSuccess$,
        registrationFailed: registrationFailed$ as Observable<
          Action<HttpErrorResponse, '[Auth API] Registration.error$'>
        >,
        logout: this.accountDeleteSession$,
        loginLeave: this.loginLeave$,
        registrationLeave: this.registrationLeave$,
      };
    },
  });

  readonly user$ = this.store.user$;
  readonly error$ = this.store.error$;
}
