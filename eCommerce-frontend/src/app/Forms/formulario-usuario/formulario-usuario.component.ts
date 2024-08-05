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
  selector: 'app-formulario-usuario',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, CommonModule],
  templateUrl: './formulario-usuario.component.html',
  styleUrl: './formulario-usuario.component.css'
})
export class FormularioUsuarioComponent implements OnInit{
  
  constructor(private fb: FormBuilder, public forms: FormsService , public Api:ApiService) {}
  hasUnitNumber = false; 
  addressForm!: FormGroup;
 
   
  ngOnInit(): void {
    this.addressForm = this.fb.group({
      id: [null, Validators.required],
      nombre: [null, Validators.required],
      email: [null, Validators.required],
      contraseña: [null, Validators.required],
      esClienteFrecuente: [null, Validators.required]
    });

    this.forms.componente.subscribe((res) => {
      console.log('Componente recibido:', res);
      console.log('Objeto Forms:', this.forms.object);
      if (res === "Usuarios") {
        if (this.forms.object && this.forms.object.id) {
          console.log('Estableciendo valores del formulario con:', this.forms.object);

          this.addressForm.setValue({
            id: this.forms.object.id,
            nombre: this.forms.object.nombre,
            email: this.forms.object.email,
            contraseña: this.forms.object.contraseña,
            esClienteFrecuente: this.forms.object.esClienteFrecuente            
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
    if (!formValue.contraseña) {
      console.error('El campo Contraseña no puede ser nulo', formValue.contraseña);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El campo tipo_documento es obligatorio.',
        confirmButtonText: 'Aceptar'
      });
      return;
    }
    try {
      await this.Api.put('usuarios', formValue, id);
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