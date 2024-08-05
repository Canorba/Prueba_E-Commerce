import { Injectable, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService /*implements OnInit*/{

  login = new BehaviorSubject<string>(this.getLocalStorageItem('login'));

  constructor() {}

  private getLocalStorageItem(key: string): string {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem(key) || '';
    }
    return '';
  }

  /*login = new BehaviorSubject<string>(localStorage.getItem('login') ?? "");

  constructor() {
    this.initializeLogin();
  }

  private initializeLogin(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      // Solo se ejecuta en el navegador
      const storedLogin = localStorage.getItem('login');
      this.login.next(storedLogin || '');
    }
  }*/


 /* constructor() {}

    login = new BehaviorSubject(localStorage.getItem('login') || "" );
    
    ngOnInit(): void {
        this.login.next(localStorage.getItem('login') || "");
    }*/
}
