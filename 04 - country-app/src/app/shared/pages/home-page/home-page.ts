import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-home-page',
  imports: [RouterLink],
  templateUrl: './home-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {

  // Hook de inicialización del componente

  // Se ejecuta después del constructor y después de recibir los @Input()
  // Solo se ejecuta una vez durante el ciclo de vida del componente

  // Usar para:

  // - Llamar servicios o APIs para obtener datos iniciales
  // - Inicializar variables y estado del componente
  // - Configurar formularios (Reactive Forms)
  // - Suscribirse a observables (luego limpiar en ngOnDestroy)
  // - Ejecutar lógica inicial (cálculos, transformaciones, setup)
  // - Usar valores provenientes de @Input()

  // Buenas prácticas:

  // - Mantener la lógica organizada (no sobrecargar este hook)
  // - Delegar lógica compleja a servicios
  // - Evitar manipulación directa del DOM (usar ngAfterViewInit)

  // No usar para:

  // - Inyección de dependencias (eso va en el constructor)
  // - Detectar cambios posteriores de @Input() (usar ngOnChanges)

  ngOnInit(): void {

    console.log('Componente cargado con hook ngOnInit')
    localStorage.setItem('Clave1', 'API_KEY: 2432$212');

  }

  ngOnDestroy(): void {

    console.log('Componente cargado con hook ngOnDestroy')
    localStorage.setItem('Clave2', 'API_KEY: 2432$212');
  }

}
