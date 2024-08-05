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
  selector: 'app-formulario-producto',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, CommonModule],
  templateUrl: './formulario-producto.component.html',
  styleUrls: ['./formulario-producto.component.css']
})
export class FormularioProductoComponent implements OnInit {

  constructor(private fb: FormBuilder, public forms: FormsService, public Api: ApiService) { }
  addressForm!: FormGroup;

  ngOnInit(): void {
    this.addressForm = this.fb.group({
      id: [null, Validators.required],
      nombre: [null, Validators.required],
      descripcion: [null, Validators.required],
      precio: [null, Validators.required],
      activo: [null, Validators.required]
    });

    this.forms.componente.subscribe((res) => {
      console.log('Componente recibido:', res);
      console.log('Objeto Forms:', this.forms.object);
      if (res === "Estudiantes") {
        if(this.forms.object && this.forms.object.id){
          console.log('Estableciendo valores del formulario con:', this.forms.object);
          this.addressForm.setValue({
            id: this.forms.object.id,
            nombre: this.forms.object.nombre,
            descripcion: this.forms.object.descripcion,
            precio: this.forms.object.precio,
            activo: this.forms.object.activo
          });
        }       
      }
    });
  }

  async onSubmit(): Promise<void> {
    const formValue = this.addressForm.value;
    const id = this.addressForm.value.id;
    if (!id) {
      console.error('No se encontró el ID en forms.object');
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se encontró el ID para actualizar los datos.',
        confirmButtonText: 'Aceptar'
      });
      return; // Salir de la función si no hay ID
    }
    if (!formValue.nombre) {
      console.error('El campo tipo_documento no puede ser nulo', formValue.nombre);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El campo tipo_documento es obligatorio.',
        confirmButtonText: 'Aceptar'
      });
      return;
    }
    try {
      await this.Api.put('productos', formValue, id);
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