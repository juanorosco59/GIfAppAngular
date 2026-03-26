import { ChangeDetectionStrategy, Component, effect, input, linkedSignal, output, signal } from '@angular/core';

@Component({
  selector: 'country-search-input',

  imports: [],
  templateUrl: './search-input.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchInput {

  //Recepción de eventos
  placeholder = input('Buscar');

  //Emision de eventos
  custom_value = output<string>();

  //Variable de señal para el timeout
  debounceTime = input(500);

  //Valor incial para mantener los resultados
  initialValue = input<string>('');

  //Guardar el contenido de la URL http://localhost:4200/country/by-capital?query=madrid

  inputValue = linkedSignal<string>(() => this.initialValue());
  //inputValue = signal<string>(this.initialValue());


  //Debounce
  debounceEffect = effect((onCleanup) => {

    const value = this.inputValue();

    const timeout = setTimeout(() => {

      this.custom_value.emit(value);

    }, this.debounceTime());

    onCleanup(() => {
      clearTimeout(timeout);
    })
    
  })


  valor = signal<string>('');
  debounceEffect2 = effect(() => { console.log('Effect por el secundario', this.valor()) })





}
