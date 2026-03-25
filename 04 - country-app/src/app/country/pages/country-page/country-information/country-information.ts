import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { Country } from '../../../interfaces/country.interface';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-country-information',
  imports: [DecimalPipe],
  templateUrl: './country-information.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryInformation {

  countryResourceInfo = input<Country>();
  currentYear = computed(() => {

    return new Date().getFullYear();
  })

}
