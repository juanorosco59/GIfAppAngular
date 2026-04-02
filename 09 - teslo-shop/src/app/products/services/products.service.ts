import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product, ProductResponse } from '@products/interfaces/product.interface';
import { map, tap, Observable, forkJoin, switchMap, of } from 'rxjs';
import { itemProduct } from 'src/app/mapper/itemProduct.interface';
import { ProductMapper } from 'src/app/mapper/product.mapper';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  constructor() {}

  private http = inject(HttpClient);

  private url = 'http://localhost:3000/api/products';
  private urlImage = 'http://localhost:3000/api/files/product';
  private urlSlug = 'http://localhost:3000/api/products';

  private productsCache = new Map<string, itemProduct[]>();

  getProductsInicial(): Observable<itemProduct[]> {
    return this.http
      .get<ProductResponse>(this.url)
      .pipe(map((response) => ProductMapper.mapProductResponseToProductToArray(response.products)));
  }

  getProducts(page: number): Observable<itemProduct[]> {
    const offset = page > 1 ? (page - 1) * 10 : 10;

    return this.http.get<ProductResponse>(this.url, { params: { offset: offset, limit: 10 } }).pipe(
      map((response) => ProductMapper.mapProductResponseToProductToArray(response.products)),

      map((items) =>
        items.map((item) => ({
          ...item,
          imageURL: `${this.urlImage}/${item.images[0]}`,
        })),
      ),
    );
  }

  getImageInicial(url: string): Observable<string> {
    return this.http.get<string>(`${this.urlImage}/${url}`);
  }

  getImage(url: string): Observable<string> {
    return this.http.get(`${this.urlImage}/${url}`, { responseType: 'blob' }).pipe(
      map((blob) => URL.createObjectURL(blob)), //Convierte a URL usable
    );
  }

  getProductsBySlug(slug: string): Observable<Product> {
    return this.http.get<Product>(`${this.urlSlug}/${slug}`);
  }

  getProductsResponse(): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.url}`);
  }

  getProductsByGender(gender: string, page: number): Observable<itemProduct[]> {
    const offset = page > 1 ? (page - 1) * 4 : 1;

    const key = `4-${offset}-${gender}`;

    if (this.productsCache.has(key)) {
      console.log('Lectura de caché', this.productsCache )
      return of(this.productsCache.get(key)!);
    }

    return this.http
      .get<ProductResponse>(this.url, { params: { gender: gender, offset: offset, limit: 4 } })
      .pipe(
        map((response) => ProductMapper.mapProductResponseToProductToArray(response.products)),
        map((items) =>
          items.map((item) => ({
            ...item,
            imageURL: `${this.urlImage}/${item.images[0]}`,
          })),
        ),
        tap((resp) => {
          this.productsCache.set(key, resp);
        }),
      );
  }

  getProductsByGenderResponse(gender: string): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(this.url, { params: { gender: gender, limit: 4 } });
    // .pipe(
    //   ap((response) => ProductMapper.mapProductResponseToProductToArray(response.products)),

    // map((items) =>
    //   items.map((item) => ({
    //     ...item,
    //     imageURL: `${this.urlImage}/${item.images[0]}`,
    //   })),
    // ),
    // );
  }
}
