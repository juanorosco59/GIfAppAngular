import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { SearchInput } from "../../components/search-input/search-input";
import { CountryList } from "../../components/country-list/country-list";
import { CountryServiceAPI } from "../../services/country";
import { RESTCountry } from '../../interfaces/rest-countries.interface';
import { CountryMapper } from '../../mappers/country.mapper';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInput, CountryList],
  templateUrl: './by-capital-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCapitalPage {

  //Se tiene que instanciar lo siguiente para poder utilizar el servicio, esto se hace con el inject, 
  //el cual es un metodo que se utiliza para inyectar dependencias, en este caso se inyecta el servicio 
  //CountryServiceAPI, el cual es el encargado de hacer las peticiones a la API.

  customeCall_countryServiceAPI = inject(CountryServiceAPI);

  isLoading = signal(false);
  isError = signal<string | null>(null);
  custom_result_request_API_countries = signal<Country[]>([]);


  custom_onSearch(custom_query: string) {

    if (this.isLoading()) return;

    this.isError.set(null);
    this.isLoading.set(true);

    this.customeCall_countryServiceAPI.custom_searchByCapital(custom_query).subscribe((custom_response) => {

      this.isLoading.set(false);

      this.isError.set(null);

      this.custom_result_request_API_countries.set(custom_response);

      console.log(custom_response);

    });

  }

}
