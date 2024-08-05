import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../Services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatInputModule, MatFormFieldModule],
  templateUrl:'./login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(public loginService: LoginService){}

  user = "" ;
  pass = "" ;

  loginForm = new UntypedFormGroup({
    username: new UntypedFormControl('', Validators.required),
    password: new UntypedFormControl('', Validators.required)
  });

  async onSubmit() {
    this.user = this.loginForm.controls["username"].value || '';
    this.pass = this.loginForm.controls["password"].value || '';

    if (this.user === "usuario" && this.pass === "1234") {
      Swal.fire(
        'Muy bien',
        'Se ha logueado Correctamente',
        'success'
      );
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('login', 'login');
      }
      this.loginService.login.next("login");
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Ooopss!!!',
        text: 'Datos Fallidos',
        footer: 'Intente con: usuario: usuario y contraseña: 1234'
      });
    }
  }
}