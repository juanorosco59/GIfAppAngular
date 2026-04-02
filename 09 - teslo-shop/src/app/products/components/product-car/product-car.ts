import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductResponse } from '@products/interfaces/product.interface';
import { ProductImagePipe } from '@products/pipes/product-image.pipe';
import { ProductsService } from '@products/services/products.service';
import { async, map } from 'rxjs';
import { itemProduct } from 'src/app/mapper/itemProduct.interface';
import { ProductMapper } from 'src/app/mapper/product.mapper';

interface Item {
  description: string;
  gender: string;
  id: string;
  image: boolean;
  
}

@Component({
  selector: 'app-product-car',
  imports: [RouterLink],
  templateUrl: './product-car.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCar {

  imgProduct = input<string | undefined>('');
  imgTitle = input<string>('');
  imgDescription = input<string>('');
  imgSlug = input<string>('');
  imgGender = input<string>('');
 
}
