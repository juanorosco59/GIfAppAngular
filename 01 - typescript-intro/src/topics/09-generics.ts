// Definición de función sin uso de genéricos

export function whatsMyType (argument: any) {
    return argument;
}

const amIString = whatsMyType('Hello World');

console.log(amIString.split('o'));

// Uso de genéricos

export function whatsMyGenericType<T>(argument: T): T {
    return argument;
}
const amIStringGeneric = whatsMyGenericType<string>('Hello Generic World');
const amINumberGeneric = whatsMyGenericType<number>(100);

console.log(amIStringGeneric.split('o'));
console.log(amINumberGeneric.toFixed);