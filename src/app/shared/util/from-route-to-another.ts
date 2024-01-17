import { NavigationEnd, Router } from '@angular/router';
import { inject } from '@angular/core';
import { EMPTY, filter, iif, of, pairwise, switchMap } from 'rxjs';

/**
 * An Observable that emits an event when routing from a specified URL to another.
 * @param {string} url The URL to watch.
 */
export function fromRouteToAnother(url: string) {
  return inject(Router).events.pipe(
    filter(e => e instanceof NavigationEnd),
    pairwise(),
    switchMap(([before, after]) =>
      iif(
        () => (before as NavigationEnd).urlAfterRedirects === url,
        of(after),
        EMPTY
      )
    )
  );
}
