import { afterEveryRender, ChangeDetectionStrategy, Component, effect, signal } from '@angular/core';
import { ElementRef, afterNextRender } from '@angular/core';
import { Title } from "../../components/title/title";

const log = (...messages: string[]) => {

  console.log(

    `${messages[0]}%c${messages.slice(1).join(',')}`,
    'color: #bada55'
  )

}


@Component({
  selector: 'app-home-page',
  imports: [Title],
  templateUrl: './home-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {

  // Forma tradicional antes de la versión 18, dependen de ZoneJS para detectar los cambios
  traditionalProperty = 'Juan';

  signalProperty = signal('Juan');

  changeTraditional() {
    this.traditionalProperty = 'Juan Orosco';

  }

  changeSignal() {

    this.signalProperty.set('Juan Orosco');

  }




  constructor() {

    console.log('Constructor llamado');

  }

  basicEffect = effect((onCleanup) => {
    log('effect', 'Disparar efectos secundarios');
    onCleanup(() => { log('onCleanup', 'Se ejecuta cuando el efecto se va a destruir'); })
  })

  ngOnInit() {
    log('ngOnInit', "Se ejecuta una vez después de que Angular inicializa los inputs del componente");
  }

  //No se refiere a una caja de texto, se refiere a una señal de entrada con un input
  ngOnChanges() {
    log('ngOnChanges', "Se ejecuta cada vez que cambian los inputs del componente");
  }

  ngDoCheck() {
    log('ngDoCheck', "Se ejecuta cada vez que Angular verifica cambios en el componente");
  }

  ngAfterContentInit() {
    log('ngAfterContentInit', 'Se ejecuta una vez después de que el contenido proyectado ha sido inicializado');
  }

  ngAfterContentChecked() {
    log('ngAfterContentChecked', 'Se ejecuta cada vez que el contenido del componente es verificado');
  }

  ngAfterViewInit() {
    log('ngAfterViewInit', 'Se ejecuta una vez después de que la vista del componente ha sido inicializada');
  }

  ngAfterViewChecked() {
    log('ngAfterViewChecked', 'Se ejecuta cada vez que la vista del componente es verificada');
  }

  ngOnDestroy() {
    log('ngOnDestroy', 'Se ejecuta una vez justo antes de que el componente sea destruido');
  }

  afterNextRender = afterNextRender(() => { log('afterNextRender', 'Se ejecuta una vez la próxima vez que todos los componentes han sido renderizados en el DOM.') })

  afterEveryRender = afterEveryRender(() => { log('afterEveryRender', 'Se ejecuta una vez la próxima vez que todos los componentes han sido renderizados en el DOM.') })

}



