import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { defaultStoreProvider } from '@state-adapt/angular';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), defaultStoreProvider],
};
