import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, catchError, throwError, delay, of, tap } from 'rxjs';
import { RESTCountry } from '../interfaces/rest-countries.interface';
import { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryServiceAPI {

  private http = inject(HttpClient);
  private queryCacheCapital = new Map<string, Country[]>(); // Esto es un mapa u objeto vacío

  private queryCacheCountry = new Map<string, Country[]>(); // Esto es un mapa u objeto vacío

    private queryCacheRegion = new Map<string, Country[]>(); // Esto es un mapa u objeto vacío




  custom_searchByCapital(query: string): Observable<Country[]> {

    query = query.toLowerCase().trim();

    //Manejo de almacenamiento de consultas con return de observable of

    if (this.queryCacheCapital.has(query)) {
      console.log(`Se consulta el caché ya no el API: ${query}`)
      return of(this.queryCacheCapital.get(query) ?? []);

    }

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`).pipe(
      map((restCountries) => CountryMapper.fromRESTCountryArrayToCountryArray(restCountries)),

      //Uso de tap para poder guardar la información


      tap((countries) => {
        this.queryCacheCapital.set(query, countries)
        console.log(`Se guarda esta consulta de API en el caché con el valor: ${query}`)

      }),

      catchError(custom_catchError => {

        console.log('Custom message - Error fetching', custom_catchError);

        return throwError(() => Error(`No se pudo otbener los paises con ese query ${query}`))
      })
    );


  }

  custom_searchByCountry(query: string): Observable<Country[]> {
    query = query.toLowerCase().trim();

    //Manejo de almacenamiento de consultas con return de observable of

    if (this.queryCacheCountry.has(query)) {
      console.log(`Se consulta el caché ya no el API: ${query}`)
      return of(this.queryCacheCountry.get(query) ?? []);

    }

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`).pipe(
      map((restCountries) => CountryMapper.fromRESTCountryArrayToCountryArray(restCountries)),

      //Uso de tap para poder guardar la información

      tap((countries) => {
        this.queryCacheCountry.set(query, countries)
        console.log(`Se guarda esta consulta de API en el caché con el valor: ${query}`)

      }),

      catchError(custom_catchError => {
        console.log('Custom message - Error fetching', custom_catchError);
        return throwError(() => Error(`No se pudo obtener los paises con ese query ${query}`))
      })


    )

  }

  custom_searchByAlphaCode(code: string) {


    return this.http.get<RESTCountry[]>(`${API_URL}/alpha/${code}`).pipe(
      map((resp) => CountryMapper.fromRESTCountryArrayToCountryArray(resp)),
      map(countries => countries.at(0)),

      catchError(custom_catchError => {
        console.log('Custom message - Error fetching', custom_catchError);
        return throwError(() => Error(`No se pudo obtener los paises con ese query ${code}`))
      })


    )

  }


    custom_searchByRegion(query: string): Observable<Country[]> {
      
    query = query.toLowerCase().trim();

    //Manejo de almacenamiento de consultas con return de observable of

    if (this.queryCacheRegion.has(query)) {
      console.log(`Se consulta el caché ya no el API: ${query}`)
      return of(this.queryCacheRegion.get(query) ?? []);

    }

    return this.http.get<RESTCountry[]>(`${API_URL}/region/${query}`).pipe(
      map((restCountries) => CountryMapper.fromRESTCountryArrayToCountryArray(restCountries)),

      //Uso de tap para poder guardar la información

      tap((countries) => {
        this.queryCacheRegion.set(query, countries)
        console.log(`Se guarda esta consulta de API en el caché con el valor: ${query}`)

      }),

      catchError(custom_catchError => {
        console.log('Custom message - Error fetching', custom_catchError);
        return throwError(() => Error(`No se pudo obtener los paises con ese query ${query}`))
      })


    )

  }

}
