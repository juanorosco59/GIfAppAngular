import { NgClass, UpperCasePipe } from "@angular/common";
import { Component, computed, inject, signal } from "@angular/core";
import { CharacterList } from "../../components/dragonball/character-list/character-list";
import { CharacterAdd } from "../../components/dragonball/character-add/character-add";
import { DragonballService } from "../../services/dragonball.service";

interface Character {
  id: number;
  name: string;
  power: number;
}


@Component({
  standalone: true,
  templateUrl: './dragonball-super-page.component.html',
  selector: 'dragonball-super',
  imports: [CharacterList, CharacterAdd],
  styles:
    `
    button {padding: 5px; margin-right: 5px;}
    `
})

export class DragonBallSuperPageComponent {

  name = signal('Gohan');
  power = signal(100);

  values = signal<number[]>([]);

  //Método 1: Injección del servicio para usarlo en el componente

  //constructor(public dragonballService: DragonballService) { }

  //Método 2:Injección del servicio para usarlo en el componente
  
  public dragonballService = inject(DragonballService);


  // characters = signal<Character[]>([
  //
  //    { id: 1, name: 'Goku', power: 15000 },
  //    { id: 2, name: 'Vegeta', power: 13000 }

  //  ]);
  //  // Método para recibir el personaje emitido por el hijo y agregarlo a la lista de personajes
  //  addCharacter(character: Character) {
  //
  //    this.characters.update((list) => [...list, character]);
  //  }


  addCharacter(character: Character) {

    this.dragonballService.addCharacter(character);
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