import { inject, Injectable } from '@angular/core';
import { concatMap, from, tap } from 'rxjs';
import { account } from '../../appwrite';
import { ID } from 'appwrite';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly router = inject(Router);

  login(email: string, password: string) {
    return from(account.createEmailSession(email, password)).pipe(
      concatMap(() => from(account.get())),
      tap(() => this.router.navigate(['/home']))
    );
  }

  register(email: string, password: string, name: string) {
    return from(account.create(ID.unique(), email, password, name)).pipe(
      concatMap(() => this.login(email, password)),
      tap(() => this.router.navigate(['/home']))
    );
  }

  logout() {
    return from(account.deleteSession('current')).pipe(
      tap(() => this.router.navigate(['/login']))
    );
  }
}
