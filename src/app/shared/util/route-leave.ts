import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { inject } from '@angular/core';
import { EMPTY, filter, iif, map, switchMap } from 'rxjs';

/**
 * An Observable that emits an event when routing away from a specified URL.
 * @param {string} url The URL to watch.
 */
export function routeLeave(url: string) {
  const router = inject(Router);

  const navigationStart$ = router.events.pipe(
    filter(e => e instanceof NavigationStart)
  );

  const routeActive = (url: string) =>
    router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map(e => (e as NavigationEnd).urlAfterRedirects === url)
    );

  return routeActive(url).pipe(
    switchMap(routeActive => iif(() => routeActive, navigationStart$, EMPTY))
  );
}
