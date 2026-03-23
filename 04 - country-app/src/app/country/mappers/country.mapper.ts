import { Country } from "../interfaces/country.interface";
import { RESTCountry } from "../interfaces/rest-countries.interface";

export class CountryMapper {

    static fromRESTCountryToCountry(restCountry: RESTCountry): Country {
        return {
            cca2: restCountry.cca2,
            coatOfArms: restCountry.coatOfArms.png || '',
            flag: restCountry.flags.png,
            flagSvg: restCountry.flags.svg,
            //name: restCountry.name.nativeName.spa.common,
            name: restCountry.translations['spa'].common ?? 'No spanish name',
            capital: restCountry.capital ? restCountry.capital[0] : 'N/A',
            population: restCountry.population,
        };
    }

    static fromRESTCountryArrayToCountryArray(restCountries: RESTCountry[]): Country[] {
        return restCountries.map(this.fromRESTCountryToCountry);
    }

}