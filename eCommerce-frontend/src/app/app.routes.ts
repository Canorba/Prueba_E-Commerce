import { Routes } from '@angular/router';
import { HomeComponent } from './Component/home/home.component';
import { LoginComponent } from './Component/login/login.component';
import { InventarioComponent } from './Component/inventario/inventario.component';
import { UsuarioComponent } from './Component/usuario/usuario.component';
import { ProductoComponent } from './Component/producto/producto.component';
import { OrdenComponent } from './Component/orden/orden.component';

export const routes: Routes = [
{path:'', redirectTo: '/Home', pathMatch: 'full' } ,
{path:'Home',component: HomeComponent } ,
{path:'Usuario',component: UsuarioComponent} ,
{path:'Producto',component: ProductoComponent},
{path:'Orden',component: OrdenComponent},
{path:'Inventario',component: InventarioComponent},
{path:'Login',component: LoginComponent}
];