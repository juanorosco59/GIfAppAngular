import { ChangeDetectionStrategy, Component, inject, resource, signal } from '@angular/core';
import { SearchInput } from "../../components/search-input/search-input";
import { CountryList } from "../../components/country-list/country-list";
import { CountryServiceAPI } from "../../services/country";
import { RESTCountry } from '../../interfaces/rest-countries.interface';
import { CountryMapper } from '../../mappers/country.mapper';
import { Country } from '../../interfaces/country.interface';
import { firstValueFrom, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouteReuseStrategy } from '@angular/router';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInput, CountryList],
  templateUrl: './by-capital-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCapitalPage {

  customeCall_countryServiceAPI = inject(CountryServiceAPI);


  //---------------------------------Versión moderna rxResource---------------------------------

  //Detalle para preservar los resultados

  activatedRoute = inject(ActivatedRoute);

  custom_queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? ''

  //Hacer navegación con Router
  router = inject(Router);

  //Se usa el recurso llamado resource para hacer consumos de forma moderna y rápida
  query = signal(this.custom_queryParam);


  countryResource = rxResource({

    params: () => ({ query: this.query() }),

    stream: ({ params }) => {

      if (!params.query) return of([]); // observable

      this.router.navigate(['/country/by-capital'], { queryParams: { query: params.query } })

      return this.customeCall_countryServiceAPI
        .custom_searchByCapital(params.query);

    },

  });


  //---------------------------------Versión moderna Resource---------------------------------

  //Se usa el recurso llamado resource para hacer consumos de forma moderna y rápida

  // query = signal('');

  // countryResource = resource({

  //   params: () => ({ query: this.query() }),

  //   loader: async ({ params }) => {

  //     if (!params.query) return [];

  //     return await firstValueFrom(this.customeCall_countryServiceAPI.custom_searchByCapital(params.query));

  //   },

  // });

  //---------------------------------Versión anterior---------------------------------

  //Se tiene que instanciar lo siguiente para poder utilizar el servicio, esto se hace con el 
  //inject, el cual es un metodo que se utiliza para inyectar dependencias, en este caso se 
  //inyecta el servicio CountryServiceAPI, el cual es el encargado de hacer las peticiones 
  //a la API.



  isLoading = signal(false);
  isError = signal<string | null>(null);
  custom_result_request_API_countries = signal<Country[]>([]);


  custom_onSearch(custom_query: string) {

    if (this.isLoading()) return;

    this.isError.set(null);
    this.isLoading.set(true);

    this.customeCall_countryServiceAPI.custom_searchByCapital(custom_query)
      // .subscribe((custom_response) => {

      //   this.isLoading.set(false);
      //   this.isError.set(null);
      //   this.custom_result_request_API_countries.set(custom_response);
      //   console.log(custom_response);

      // });

      .subscribe({

        next: (custom_response) => {
          this.isLoading.set(false);
          this.custom_result_request_API_countries.set(custom_response)

        },
        error: (custom_error) => {
          this.isLoading.set(false);
          this.custom_result_request_API_countries.set([]);
          // this.isError.set(`No se encontró un país con esa capital ${custom_error}`);
          this.isError.set(custom_error);

        }

      })

  }

}
