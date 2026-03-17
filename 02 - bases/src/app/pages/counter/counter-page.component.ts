import { Component, signal } from "@angular/core";

@Component({

    //template: `

    //<h1>Contador: {{counter}}</h1>
    //<button (click)="incrementarValor(10)">+10</button>

    //`,

    templateUrl: './counter-page.component.html',
    styles:
        `
    button {padding: 5px; margin-right: 5px;}
    `
})

export class CounterPageComponent {

    counter = 10;
    counterOriginal = this.counter;
    // Señales
    counterSignal = signal(10);

    constructor() {
        //setInterval(() => { this.incrementarValor(1) }, 2000);
    }

    incrementarValor(value: number): void {
        this.counter += value;
        this.counterSignal.update((current) => current + value);
    }

    reducirValor(value: number): void {
        this.counter -= value;
        this.counterSignal.update((current) => current - value);
    }

    valorOriginal(): void {
        this.counter = this.counterOriginal;
        this.counterSignal.set(0);
    }

}
