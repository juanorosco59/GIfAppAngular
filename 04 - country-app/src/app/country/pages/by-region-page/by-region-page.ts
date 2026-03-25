import { ChangeDetectionStrategy, Component, inject, linkedSignal, signal } from '@angular/core';
import { SearchInput } from "../../components/search-input/search-input";
import { CountryList } from "../../components/country-list/country-list";
import { Region } from '../../interfaces/region-type';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { CountryServiceAPI } from '../../services/country';
import { ActivatedRoute, Router } from '@angular/router';



function validateQueryParam(queryParam: string): Region {


  queryParam = queryParam.toLowerCase();

  const validRegions: Record<string, Region> = {

    'africa': 'Africa',
    'americas': 'Americas',
    'asia': 'Asia',
    'aurope': 'Europe',
    'oceania': 'Oceania',
    'antarctic': 'Antarctic',

  }

  console.log('Funcion', validRegions[queryParam])

  return validRegions[queryParam] ?? 'Americas;'


}


@Component({
  selector: 'app-by-region-page',
  imports: [CountryList],
  templateUrl: './by-region-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByRegionPage {

  customeCall_countryServiceAPI = inject(CountryServiceAPI);


  activatedRoute = inject(ActivatedRoute);

  router = inject(Router);


  custom_queryParam = (this.activatedRoute.snapshot.queryParamMap.get('query') ?? '');


  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];



  //selectedRegion = linkedSignal<Region>(() => this.custom_queryParam ?? 'Americas');

  selectedRegion = linkedSignal<Region>(() => validateQueryParam(this.custom_queryParam));



  selectRegion(region: Region) {

    this.selectedRegion.set(region);

    //this.query.set(region);

  }

  //---------------------------------Versión moderna rxResource---------------------------------

  //query = signal('');

  countryResource = rxResource({

    params: () => ({ query: this.selectedRegion() }),

    stream: ({ params }) => {

      if (!params.query) return of([]); // Observable


      this.router.navigate(['/country/by-region'], { queryParams: { query: params.query } })

      return this.customeCall_countryServiceAPI
        .custom_searchByRegion(params.query);

    },

  });

  //



}

