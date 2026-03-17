//Decoradores de clase: Una función que se aplica a la definición de una clase
//y puede modificar su comportamiento o agregar propiedades/métodos.
//no se crea normalmente decoradores en angular, se usan los que ya existen.
//Permite que una clase sea un servicio, un componente, un modulo, etc.

//En resumen, un decorador es una función que recibe como argumento el constructor de la clase y puede
//modificarla o extenderla.

function classDecorator<T extends { new(...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
        newProperty: string = 'New Property';
        hello = 'override';
    }
}

@classDecorator
export class SuperClass {

    public myProperty: string = 'Hello ABC';
    print() {
        console.log('Hola Mundo desde el método print de SuperClass');
    }
}

console.log(SuperClass);

const myClass = new SuperClass();

console.log(myClass);