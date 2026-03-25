import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { CountryServiceAPI } from '../../services/country';
import { NotFound } from "../../../shared/components/not-found/not-found";
import { CountryInformation } from "./country-information/country-information";



@Component({
  selector: 'app-country-page',
  imports: [NotFound, CountryInformation],
  templateUrl: './country-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryPage {

  countryCode = inject(ActivatedRoute).snapshot.params['custom_code'];

  countryService = inject(CountryServiceAPI)

  countryResource = rxResource({

    params: () => ({ code: this.countryCode }),

    stream: ({ params }) => this.countryService.custom_searchByAlphaCode(params.code)
  })


}


