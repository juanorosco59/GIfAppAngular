import { ChangeDetectionStrategy, Component, output, signal } from '@angular/core';
import { Character } from '../../../interfaces/character.interface';

@Component({
  selector: 'dragonball-character-add',
  imports: [],
  templateUrl: './character-add.html',

})
export class CharacterAdd {

  name = signal('');
  power = signal(0);

  //Permite definir que este componente emite algo
  newCharacter = output<Character>();


  addCharacter() {
    console.log(this.name(), this.power())

    if (!this.name() || !this.power() || this.power() <= 0) { return; }

    const newCharacter: Character = {

      //Agregar de forma aleatoria un id para el nuevo personaje
      id: Math.floor(Math.random() * 1000),
      name: this.name(),
      power: this.power(),

    };

    //Colocar la emisión del nuevo personaje para que el padre lo reciba
    this.newCharacter.emit(newCharacter);
    this.resetFields();

  }

  resetFields() {
    this.name.set('');
    this.power.set(0);

  }

}