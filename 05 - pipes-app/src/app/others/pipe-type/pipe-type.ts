import { Component, signal } from '@angular/core';
import {
  DatePipe,
  UpperCasePipe,
  LowerCasePipe,
  TitleCasePipe,
  CurrencyPipe,
  DecimalPipe,
  PercentPipe,
  JsonPipe,
  KeyValuePipe,
  SlicePipe,
  AsyncPipe,
  I18nPluralPipe,
  I18nSelectPipe
} from '@angular/common';

@Component({
  selector: 'app-pipe-type',
    imports: [
    DatePipe,
    UpperCasePipe,
    LowerCasePipe,
    TitleCasePipe,
    CurrencyPipe,
    DecimalPipe,
    PercentPipe,
    JsonPipe,
    KeyValuePipe,
    SlicePipe,
    AsyncPipe,
    I18nPluralPipe,
    I18nSelectPipe
  ],
  templateUrl: './pipe-type.html',
})
export class PipeType {



// 🔹 Signals
  today = signal(new Date());
  text = signal('hola mundo angular');
  price = signal(1234.56);
  number = signal(1234.567);
  percent = signal(0.25);
  items = signal(['a', 'b', 'c']);
  gender = signal('male');

  user = signal({
    name: 'Juan',
    age: 30
  });

  promise = signal(Promise.resolve('Data cargada 🚀'));

  // 🔹 i18n
  pluralMap = {
    '=0': 'No items',
    '=1': 'One item',
    'other': '# items'
  };

  genderMap = {
    male: 'Mr.',
    female: 'Ms.',
    other: 'Friend'
  };



 }
