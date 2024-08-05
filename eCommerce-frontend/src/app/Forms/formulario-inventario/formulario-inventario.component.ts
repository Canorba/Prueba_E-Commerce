import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormsService } from '../../Services/forms.service';
import { ApiService } from '../../Services/api.service';
import Swal from 'sweetalert2';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field'; // Asegúrate de importar el módulo
import { MatInputModule } from '@angular/material/input'; // También necesitas importar MatInputModule
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formulario-inventario',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, CommonModule],
  templateUrl: './formulario-inventario.component.html',
  styleUrl: './formulario-inventario.component.css'
})
export class FormularioInventarioComponent implements OnInit {

  constructor(private fb: FormBuilder, public forms: FormsService, public Api: ApiService) { }
  hasUnitNumber = false;
  addressForm!: FormGroup;


  ngOnInit(): void {

    this.addressForm = this.fb.group({
      id: [null, Validators.required],
      productoId: [null, Validators.required],
      cantidad: [null, Validators.required]  
    });

    this.forms.componente.subscribe((res) => {
      console.log('Componente recibido:', res);
      console.log('Objeto Forms:', this.forms.object);
      if (res === "Inventarios") {
        if (this.forms.object && this.forms.object.id) {
          console.log('Estableciendo valores del formulario con:', this.forms.object);

          this.addressForm.setValue({
              id: this.forms.object.id,
              productoId: this.forms.object.productoId,
              cantidad: this.forms.object.cantidad
            });
          }}
      });
  }

  async onSubmit(): Promise<void> {
    if (this.addressForm.invalid) {
      console.error('Formulario inválido');
      return;
    }

    const formValue = this.addressForm.value;
    const payload = {
      cantidad: formValue.cantidad,
      producto: {
        id: formValue.productoId
      }
    };

    try {
      await this.Api.put('inventarios', payload, formValue.id);
      console.log('Datos guardados exitosamente.');
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Los cambios se han guardado exitosamente.',
        confirmButtonText: 'Aceptar'
      });
    } catch (error) {
      console.error('Error al guardar los datos:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Se produjo un error al guardar los cambios.',
        confirmButtonText: 'Aceptar'
      });
    }
  }
}