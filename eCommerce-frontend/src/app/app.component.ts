import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginService } from './Services/login.service';
import { MenuLateralComponent } from "./Component/menu-lateral/menu-lateral.component";
import { LoginComponent } from "./Component/login/login.component";
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuLateralComponent, LoginComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'colegio-frontend';

  constructor(public loginservice: LoginService){}

  login: String = "login";

  ngOnInit(): void{

    if(localStorage.getItem('login') === null){
      localStorage.setItem('login', 'logout');
    }
    if(this.loginservice.login.value == "login"){
      this.loginservice.login.next("login");
    }else{
      this.loginservice.login.next("logout");
    }
    this.loginservice.login.subscribe(value => {
      this.login = value;
      console.log(this.login);
    })
  }
}
