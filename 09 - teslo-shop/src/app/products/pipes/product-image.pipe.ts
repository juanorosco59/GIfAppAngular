import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productImage',
})
export class ProductImagePipe implements PipeTransform {
  transform(value: string | string[]): any {
    if (typeof value === 'string') {
      console.warn('No images found for product 1, using default image.');

      return `http://localhost:3000/api/files/product/${value}`;
    }

    const image = value.at(0);
    if (!image) {
      console.warn('No images found for product 2, using default image.');
      return './assets/images/no-image.jpg';
    }

    return `http://localhost:3000/api/files/product/${image}`;
  }
}
