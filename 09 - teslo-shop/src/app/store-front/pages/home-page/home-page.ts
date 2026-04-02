import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { ProductCar } from '@products/components/product-car/product-car';
import { ProductsService } from '@products/services/products.service';
import { itemProduct } from 'src/app/mapper/itemProduct.interface';
import { JsonPipe, NgClass } from '@angular/common';
import { Pagination } from '@shared/pagination/pagination';
import { ProductResponse } from '@products/interfaces/product.interface';
import { ActivatedRoute } from '@angular/router';
import { PaginationService } from '@shared/pagination/pagination.service';

@Component({
  selector: 'app-home-page',
  imports: [ProductCar, Pagination],
  templateUrl: './home-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  currentPageImported = signal<number>(1);

  productService = inject(ProductsService);

  productResponse = signal<itemProduct[]>([]);

  productResponseAll = signal<ProductResponse>({} as ProductResponse);

  activateRoute = inject(ActivatedRoute);

  currentPageAfterRouter = Number(this.activateRoute.snapshot.queryParamMap.get('page'));

  paginationService = inject(PaginationService);


  constructor() {}

  ngOnInit(): void {
    this.productService.getProducts(PaginationService.getGeneralNumber()).subscribe((items) => {
      console.log('Product Response:', items);
      this.productResponse.set(items);
    });

    this.productService.getProductsResponse().subscribe((items) => {
      console.log('Product Response:', items);
      this.productResponseAll.set(items);
    });
  }

  ngOnDestroy(): void {
    this.productResponse().forEach((element) => {
      this.productService.getImage(element.images[0]).subscribe((imageUrl) => {
        console.log('Image URL:', imageUrl);
      });
    });
  }

  showCurrentPageImported(page: number): void {
    console.log('Número de página importada', page);
    this.currentPageImported.set(page);
  }

  updateProductAfterChangePage = effect(() => {
    console.log('Página obtenida desde el servicio', this.paginationService.getCurrentPage());

    console.log(`The current impote page is:${this.currentPageImported()}`);
    console.log('currentPageAfterRouter', this.currentPageAfterRouter);

    this.productService.getProducts(this.currentPageImported()).subscribe((items) => {
      console.log('Product Response:', items);
      this.productResponse.set(items);
    });
  });
}
