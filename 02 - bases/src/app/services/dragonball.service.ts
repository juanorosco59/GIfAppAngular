import { effect, Injectable, signal } from '@angular/core';
import { Character } from '../interfaces/character.interface';

//Definimos una función para cargar los personajes desde localStorage al iniciar la aplicación
function loadFromLocalStorage(): Character[] {
    const data = localStorage.getItem('characters');
    return data ? JSON.parse(data) : [];
}


@Injectable({
    providedIn: 'root'
})
export class DragonballService {

    charactersX = signal<Character[]>([

        { id: 1, name: 'Goku', power: 15000 },
        { id: 2, name: 'Vegeta', power: 13000 }

    ]);

    //Definimos un signal para la lista de personajes, inicializándola con los datos cargados desde localStorage
    characters = signal<Character[]>(loadFromLocalStorage());

    //Uso de effect para guardar automáticamente en localStorage cada vez que cambia la lista de personajes

    saveToLocalStorage = effect(() => {
        console.log(`Guardando personajes en localStorage: ${this.characters().length}`);
        localStorage.setItem('characters', JSON.stringify(this.characters()));
    });

    addCharacter(character: Character) {

        this.characters.update((list) => [...list, character]);
    }
}   