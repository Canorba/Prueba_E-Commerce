import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LoginService } from '../../Services/login.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu-lateral',
  standalone: true,
  imports: [ CommonModule, MatSidenavModule, MatListModule, MatIconModule, 
    MatButtonModule, MatToolbarModule, MatCardModule, RouterModule],
  templateUrl: './menu-lateral.component.html',
  styleUrl: './menu-lateral.component.css'
})
export class MenuLateralComponent {

  isHandset$: Observable<boolean>;

  constructor(private breakpointObserver: BreakpointObserver, public loginservice: LoginService) {
    this.isHandset$ = this.initializeIsHandsetObservable();
  }

  private initializeIsHandsetObservable(): Observable<boolean> {
    return this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches),
        shareReplay()
      );
  }

  async onSubmit() {
    localStorage.setItem('login', 'logout');
    this.loginservice.login.next('logout');
  }
}
