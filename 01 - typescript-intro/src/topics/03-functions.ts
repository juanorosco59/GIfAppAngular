function addNumbers(a: number, b: number): number {
    return a + b;
}
const sum = addNumbers(10, 5);

function multiplyNumbers(a: number, b: number): number {
    return a * b;
}

const product = multiplyNumbers(10, 5);


const addNumbersArrow = (a: number, b: number): number => {
    return a + b;
}


console.log(`Producto: ${product}`);
console.log(`Suma: ${sum}`);
console.log(`SumaFlecha: ${addNumbersArrow(10, 5)}`);

export {};