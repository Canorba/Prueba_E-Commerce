import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatNativeDateModule} from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MenuLateralComponent } from './Component/menu-lateral/menu-lateral.component';
import { UsuarioComponent } from './Component/usuario/usuario.component';
import { ProductoComponent } from './Component/producto/producto.component';
import { OrdenComponent } from './Component/orden/orden.component';
import { InventarioComponent } from './Component/inventario/inventario.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withFetch } from '@angular/common/http'; 
import {MatTableModule} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TableTemplateComponent } from './Component/table-template/table-template.component'; 
import {MatDialogModule} from '@angular/material/dialog';
import { FormularioInventarioComponent } from './Forms/formulario-inventario/formulario-inventario.component';
import { FormularioOrdenComponent } from './Forms/formulario-orden/formulario-orden.component'; 
import { FormularioProductoComponent } from './Forms/formulario-producto/formulario-producto.component'; 
import { FormularioUsuarioComponent } from './Forms/formulario-usuario/formulario-usuario.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { LoginComponent } from './Component/login/login.component'; 
import { routes } from './app.routes';
import { MatSortModule } from '@angular/material/sort';
import { FormGroup } from '@angular/forms';

NgModule({
  declarations: [
    AppComponent,
    MenuLateralComponent,
    UsuarioComponent,
    ProductoComponent,
    OrdenComponent,
    LoginComponent,
    InventarioComponent,
    FormularioInventarioComponent,
    FormularioOrdenComponent,
    FormularioProductoComponent,
    FormularioUsuarioComponent,
    TableTemplateComponent
],
  imports: [
    FormGroup,
    BrowserModule,
    routes,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatSortModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    CommonModule
  ],
  
  providers: [provideHttpClient(withFetch())],
  bootstrap: [AppComponent]
})
export class AppModule { }