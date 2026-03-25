import { ChangeDetectionStrategy, Component, inject, resource, signal } from '@angular/core';
import { SearchInput } from "../../components/search-input/search-input";
import { CountryList } from "../../components/country-list/country-list";
import { CountryServiceAPI } from '../../services/country';
import { firstValueFrom, of, take } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-country-page',
  imports: [SearchInput, CountryList],
  templateUrl: './by-country-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCountryPage {

  customeCall_countryServiceAPI = inject(CountryServiceAPI);

  activatedRoute = inject(ActivatedRoute);

  custom_queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? ''


  //Hacer navegación con Router
  router = inject(Router);

  
  //---------------------------------Versión moderna rxResource---------------------------------

  query = signal(this.custom_queryParam);

  countryResource = rxResource({

    params: () => ({ query: this.query() }),

    stream: ({ params }) => {

      if (!params.query) return of([]); // Observable

      this.router.navigate(['/country/by-country'], { queryParams: { query: params.query } })


      return this.customeCall_countryServiceAPI
        .custom_searchByCountry(params.query);

    },

  });


  //---------------------------------Versión moderna---------------------------------

  //Se usa el recurso llamado resource para hacer consumos de forma moderna y rápida

  // query = signal('');

  // countryResource = resource({

  //   params: () => ({ query: this.query() }),

  //   loader: async ({ params }) => {

  //     if (!params.query) return [];

  //     return await firstValueFrom(this.customeCall_countryServiceAPI.custom_searchByCountry(params.query));

  //   },

  // });

}
