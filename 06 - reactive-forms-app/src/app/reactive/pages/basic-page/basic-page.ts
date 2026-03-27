import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';



interface Datos {
  nombre: string;
  apellido: string;
}


@Component({
  selector: 'app-basic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './basic-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicPage {

  // Primera forma de definir el formulario


  myFormBefore = new FormGroup({
    name: new FormControl(''),
    price: new FormControl(0),
    inStorage: new FormControl(0),
  });

  // Segunda forma de definir el formulario

  private fb = inject(FormBuilder);

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.minLength(3)]],
    price: [0, [Validators.min(10)]],
    inStorage: [0, [Validators.min(2)]],
  });

  isValidFieldToBeEvaluated(fieldName: string): Boolean | null {

    return (this.myForm.controls[fieldName].errors && this.myForm.controls[fieldName].touched);

  }

  getFieldError(fieldName: string): string | null {


    if (!this.myForm.controls[fieldName]) return null;

    const errors = this.myForm.controls[fieldName].errors ?? {}

    for (const key of Object.keys(errors)) {

      console.log('Validación erronea', key)

      switch (key) {
        case 'required': return `Este campo es requerido`;
        case 'minlength': return `Mínimo de ${errors['minlength'].requiredLength} caracteres`;
        case 'min': return `Valor mínimo de ${errors['min'].min} `;
      }

    }

    return ``

  }

  onSave() {

    //Esto valida internamente si las validaciones del formulario se han cumplido

    if (this.myForm.invalid) {

      //Si no se ha cumplido con la validaciones entonces el sistema obliga a mostrar todos los errores

      this.myForm.markAllAsTouched()

      return;
    }

    //Aca se puede indicar  la acción a realizar, por ejemplo llamada a API

    console.log(this.myForm.value);

    //Resetear y activar valores por defecto
    this.myForm.reset({
      price: 100,
      name: "Juan",
      inStorage: 10,

    })


  }

}
