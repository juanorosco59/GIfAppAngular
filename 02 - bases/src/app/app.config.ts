import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),

    // HashStrategy: Si queremos usar rutas con hash (ejemplo: http://localhost:4200/#/hero), podemos agregar el siguiente provider:
    { provide: LocationStrategy, useClass: HashLocationStrategy, },
  ]
};
