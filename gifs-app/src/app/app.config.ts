import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),

    //Sino coloco la siguiente instrucción, entonces angular tomara por defecto
    // el HttpClientModule, el cual utiliza XMLHttpRequest para hacer las peticiones HTTP,
    // lo cual no es tan eficiente como utilizar la API Fetch, 
    // que es la que se utiliza en el navegador.

    //Aca lo proveemos, pero en la interface lo injectamos, 
    // lo cual es una forma de decirle a Angular que queremos utilizar esta herramienta 
    // en nuestra aplicación, y que la inyecte en los componentes 
    // o servicios que la necesiten, como es el caso del servicio de gifs.

    provideHttpClient(withFetch())
  ]
};
