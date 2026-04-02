//La idea es recibir el objeto y responder un objeto basado en nuestra clase

import { Product, ProductResponse } from "@products/interfaces/product.interface";
import { itemProduct } from "./itemProduct.interface";



export class ProductMapper {
  static mapProductResponseToProduct(Item: Product): itemProduct {
    return {
      id: Item.id,
      title: Item.title,
      images: Item.images,
      tags: Item.tags,
      imageURL: '',
      description: Item.description,
      slug: Item.slug,
      gender:Item.gender
    };
  }

  static mapProductResponseToProductToArray(Elements: Product[]): itemProduct[] {
    //Lo siguiente permite mapear un arreglo de objetos de tipo GiphyItem a un arreglo
    //de objetos de tipo Gif, utilizando la función mapGiphyItemToGif para
    //cada elemento del arreglo, lo cual nos permite obtener un nuevo arreglo
    //con la estructura definida por la interfaz Gif, y así poder trabajar con
    //los datos de los gifs de una manera más sencilla y clara en nuestra aplicación.

    //La función map es una función de orden superior que se utiliza para
    //transformar cada elemento de un arreglo, aplicando una función a cada
    //uno de ellos y devolviendo un nuevo arreglo con los resultados de
    //la transformación.

    return Elements.map((item) => this.mapProductResponseToProduct(item));
  }
}
