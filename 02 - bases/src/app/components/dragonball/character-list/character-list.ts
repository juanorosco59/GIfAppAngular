import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { Character } from '../../../interfaces/character.interface';

@Component({
  // selector define el nombre de la etiqueta HTML que se usará
  // para insertar este componente en un template padre
  // Ejemplo en el padre: <dragonball-character-list></dragonball-character-list>
  selector: 'dragonball-character-list',

  // imports sirve para declarar otros componentes, pipes o directivas
  // que este componente puede usar en su template
  imports: [],

  // templateUrl apunta al archivo HTML que contiene la vista del componente

  templateUrl: './character-list.html',
})
export class CharacterList {

  // input.required indica que esta propiedad es un INPUT obligatorio
  // Esto significa que el componente padre debe enviar este valor
  // Ejemplo desde el padre: <dragonball-character-list [characters]="characters()" />

  characters = input.required<Character[]>();

  // Otro input obligatorio que recibe el nombre de la lista
  // Ejemplo desde el padre: <dragonball-character-list listName="Listado de personajes" />
  listName = input.required<string>();

}
