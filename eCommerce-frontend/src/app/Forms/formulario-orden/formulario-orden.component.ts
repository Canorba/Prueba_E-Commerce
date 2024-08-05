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
  selector: 'app-formulario-orden',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, CommonModule],
  templateUrl: './formulario-orden.component.html',
  styleUrl: './formulario-orden.component.css'
})
export class FormularioOrdenComponent implements OnInit {

  constructor(private fb: FormBuilder, public forms: FormsService, public Api: ApiService) { }
  hasUnitNumber = false;
  addressForm!: FormGroup;


  ngOnInit(): void {

    this.addressForm = this.fb.group({
      id: [null, Validators.required],
      usuarioId: [null, Validators.required],
      fecha: [null, Validators.required],
      total: [null, Validators.required],
      descuentoAplicado: [null, Validators.required]      
    });

    this.forms.componente.subscribe((res) => {
      console.log('Componente recibido:', res);
      console.log('Objeto Forms:', this.forms.object);
      if (res === "Ordenes") {
        if (this.forms.object && this.forms.object.id) {
          console.log('Estableciendo valores del formulario con:', this.forms.object);

          this.addressForm.setValue({
              id: this.forms.object.id,
              usuarioId: this.forms.object.usuarioId,
              fecha: this.forms.object.fecha,
              total: this.forms.object.total,
              descuentoAplicado: this.forms.object.descuentoAplicado
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
      fecha: formValue.fecha,
      usuario: {
        id: formValue.usuarioId
      },
      total: formValue.total,
      descuentoAplicado: formValue.descuentoAplicado
    };

    try {
      await this.Api.put('ordenes', payload, formValue.id);
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