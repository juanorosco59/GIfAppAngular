import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, single } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductCar } from '@products/components/product-car/product-car';
import { ProductsService } from '@products/services/products.service';
import { itemProduct } from 'src/app/mapper/itemProduct.interface';
import { Pagination } from '@shared/pagination/pagination';
import { ProductResponse } from '@products/interfaces/product.interface';
import { PaginationService } from '@shared/pagination/pagination.service';

@Component({
  selector: 'app-gender-page',
  imports: [ProductCar, Pagination],
  templateUrl: './gender-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenderPage {
  route = inject(ActivatedRoute);

  gender = toSignal(this.route.params.pipe(map(({ gender }) => gender)));

  result = effect(() => {
    this.productService
      .getProductsByGender(this.gender()!, this.paginationService.getCurrentPage())
      .subscribe((items) => {
        console.log('Product Response:', items);
        this.productResponse.set(items);
      });
  });

  productService = inject(ProductsService);

  productResponse = signal<itemProduct[]>([]);

  paginas = signal(1);

  paginationService = inject(PaginationService);

  currentPageImported = signal(0);

  constructor() { }

  ngOnInit(): void {
    console.log('Number of pages from gender-page', this.paginas);

    this.productService
      .getProductsByGender(this.gender()!, this.paginationService.getCurrentPage())
      .subscribe((items) => {
        console.log('Product Response:', items);
        this.productResponse.set(items);
      });

    this.productService.getProductsByGenderResponse(this.gender()!).subscribe((items) => {
      console.log('Quantity of pages ngOnInit:', items);
      this.paginas.set(items.pages);
    }
  );
  }

  showCurrentPageImported(page: number): void {
    console.log('Número de página importada', page);
    this.currentPageImported.set(page);
  }

  updatePage = effect(() => {
    console.log('Number of pages from gender-page', this.currentPageImported());

    this.productService
      .getProductsByGender(this.gender()!, this.currentPageImported())
      .subscribe((items) => {
        console.log('Product responsa data:', this.gender()!, this.currentPageImported());
        this.productResponse.set(items);
      });

          this.productService.getProductsByGenderResponse(this.gender()!).subscribe((items) => {
      console.log('Quantity of pages ngOnInit:', items);
      this.paginas.set(items.pages);
    })

    });
  }