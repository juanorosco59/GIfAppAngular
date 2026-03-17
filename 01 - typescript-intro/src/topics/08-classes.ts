export class Person {

    public name: string;
    public address: string

    constructor(name: string, address: string) {
        this.name = name;
        this.address = address;
    }

}


export class PersonNew {

    constructor(
        public name: string,
        private address: string = 'No address'
    ) { }

}


export class Hero extends PersonNew {

    constructor(
        public alterEgo: string,
        public age: number,
        public realName: string
    ) {
        super(realName, 'New York, USA');
    }
}


//Composición de clases: 

export class HeroNew {

    //public person: PersonNew;

    constructor(
        public alterEgo: string,
        public age: number,
        public realName: string,
        public person: PersonNew
    ) {
        // this.person = new PersonNew(realName);

    }
}



const person = new Person('Juan', 'Ottawa, Canada');
const personNew = new PersonNew('Juan', 'Ottawa, Canada');
const ironman = new Hero('Ironman', 45, 'Tony Stark');
const personX = new HeroNew('Spiderman', 21, 'Peter Parker', personNew);

console.log(person);
console.log(personNew);
console.log(ironman);
console.log(personX);