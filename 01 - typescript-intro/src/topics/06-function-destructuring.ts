export interface Product {
    description: string;
    price: number;
}

const phone: Product = {
    description: 'Nokia A1',
    price: 100,
}
const tablet: Product = {
    description: 'iPad Air',
    price: 200,
}

const shoppingCart = [phone, tablet];
const tax = 0.10;

interface TaxCalculationOptions {
    products: Product[];
    tax: number;
}


export function taxCalculation(options: TaxCalculationOptions): number[] {
    let total = 0;
    options.products.forEach((product) => {
        total += product.price;
    }
    );
    return [total, total * options.tax];
}

function taxCalculationWithDes(options: TaxCalculationOptions): number[] {

    let total2 = 0;
    //Destructuring parameters
    options.products.forEach(({ price }) => {

        total2 += price
    });

    return [total2, total2 * options.tax];

}

const result = taxCalculation({ products: shoppingCart, tax: tax });

//Destructuring parameters

const [totalDes, taxDes] = taxCalculation({ products: shoppingCart, tax: tax });

console.log(result[0], result[1]);
console.log(totalDes, taxDes);

