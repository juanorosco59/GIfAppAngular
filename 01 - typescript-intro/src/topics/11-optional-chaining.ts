export interface Passenger {
    name: string;
    children?: string[];
}

const passenger1: Passenger = {
    name: 'Juan Perez'
};

const passenger2: Passenger = {
    name: 'Ana Gomez',
    children: ['Sara', 'Carlos']
};

const printChilden = (passenger: Passenger): void => {

    //Opcional chaining (?.)
    //Permite acceder a propiedades anidadas de un objeto sin tener que verificar si cada nivel existe.
    //Valida que si la propiedad children es undefined o null, no intente acceder a length y retorne 0 en su lugar.
    const howManyChildren = passenger.children?.length || 0;

    //! notación de non-null assertion operator (!)
    //Es una forma de decirle a TypeScript que una expresión siempre tendrá un valor no nulo o no indefinido.
    //const howManyChildren = passenger.children!.length;

    console.log(howManyChildren);
}

printChilden(passenger1);
printChilden(passenger2);