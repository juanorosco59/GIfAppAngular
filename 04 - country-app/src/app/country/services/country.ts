import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, catchError, throwError, delay } from 'rxjs';
import { RESTCountry } from '../interfaces/rest-countries.interface';
import { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryServiceAPI {

  private http = inject(HttpClient);

  custom_searchByCapital(query: string): Observable<Country[]> {

    query = query.toLowerCase().trim();

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`).pipe(
      map((restCountries) => CountryMapper.fromRESTCountryArrayToCountryArray(restCountries)),
      catchError(custom_catchError => {

        console.log('Custom message - Error fetching', custom_catchError);

        return throwError(() => Error(`No se pudo otbener los paises con ese query ${query}`))
      })
    );


  }

  custom_searchByCountry(query: string): Observable<Country[]> {
    query = query.toLowerCase().trim();

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`).pipe(
      map((restCountries) => CountryMapper.fromRESTCountryArrayToCountryArray(restCountries)),
      delay(2000),
      catchError(custom_catchError => {
        console.log('Custom message - Error fetching', custom_catchError);
        return throwError(() => Error(`No se pudo obtener los paises con ese query ${query}`))
      })


    )

  }

}
