import { NgClass, UpperCasePipe } from "@angular/common";
import { Component, computed, signal } from "@angular/core";

interface Character {
    id: number;
    name: string;
    power: number;
}


@Component({
    standalone: true,
    templateUrl: './dragonball-page.component.html',
    imports: [],
    styles:
        `
    button {padding: 5px; margin-right: 5px;}
    `
})

export class DragonBallPageComponent {




    name = signal('Gohan');
    power = signal(100);

    values = signal<number[]>([]);

    characters = signal<Character[]>([

        { id: 1, name: 'Goku', power: 15000 },
        { id: 2, name: 'Vegeta', power: 13000 },
        { id: 3, name: 'Piccolo', power: 7000 },

    ]);

    addCharacter() {
        console.log(this.name(), this.power())

        if (!this.name() || !this.power() || this.power() <= 0) { return; }

        const newCharacter: Character = {

            id: this.characters().length + 1,
            name: this.name(),
            power: this.power(),

        };

        // Cambiar el valor de la lista de forma antigua
        //this.characters().push(newCharacter);
        // Cambiar el valor de la lista de forma nueva y moderna con señales
        this.characters.update((list) => [...list, newCharacter]);
        this.resetFields();

    }

    resetFields() {
        this.name.set('');
        this.power.set(0);

    }

  onPaste(event: ClipboardEvent) {

    event.preventDefault(); // evitamos el pegado normal

    const texto = event.clipboardData?.getData('text') ?? '';

    const numeros = texto
      .split(/[\n\t,; ]+/)  // separa por salto de línea, tab, coma, etc
      .filter(v => v.trim() !== '')
      .map(v => Number(v.trim()))
      .filter(v => !isNaN(v));

    this.values.set(numeros);

    console.log('Valores convertidos:', numeros);
  }

  onInput(event: Event) {

    const input = event.target as HTMLInputElement;

    const numeros = input.value
      .split(/[\n\t,; ]+/)   // separa por salto de línea, tab, coma, etc.
      .filter(v => v.trim() !== '')
      .map(v => Number(v.trim()))
      .filter(v => !isNaN(v));

    this.values.set(numeros);
  }

}