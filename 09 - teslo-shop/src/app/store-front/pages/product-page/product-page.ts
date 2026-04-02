import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '@products/interfaces/product.interface';
import { ProductsService } from '@products/services/products.service';
import { itemProduct } from 'src/app/mapper/itemProduct.interface';
import { ProductCarousel } from "@products/product-carousel/product-carousel";

@Component({
  selector: 'app-product-page',
  imports: [ProductCarousel],
  templateUrl: './product-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductPage { 

  productService = inject(ProductsService);

  productResponse = signal<Product>({} as Product);

  routerService = inject(Router);

  private currentSlug = this.routerService.url.split('/').pop() || '';

  ngOnInit(): void {

    console.log('Current Slug:', this.currentSlug);


    this.productService.getProductsBySlug(this.currentSlug).subscribe((product) => {
      this.productResponse.set(product);
    });

}

}