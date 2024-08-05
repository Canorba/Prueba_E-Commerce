import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../../Services/api.service';
import { FormularioUsuarioComponent } from '../../Forms/formulario-usuario/formulario-usuario.component';
import { TableService } from '../../Services/table.service';
import { MatDialog } from '@angular/material/dialog';
import { FormsService } from '../../Services/forms.service';
import { TableTemplateComponent } from "../table-template/table-template.component";
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [TableTemplateComponent],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent implements OnInit{

  column?:Object;
  displayedColumns: string[]=[]
  dataSource!: MatTableDataSource<any>; 
  acciones = 'acciones';
  Componenente?: String;
  titulo="Usuarios";
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private Api: ApiService,public tableService: TableService,public dialog: MatDialog,public forms: FormsService){
    this.dataSource=new MatTableDataSource();
  }

  ngOnInit(): void {
      this.Getestudiantes();
     
  }

  openModal() {
    const dialogRef = this.dialog.open(FormularioUsuarioComponent);

  }

  async Getestudiantes() {
    this.tableService.titleTabla = "Usuarios";
    this.tableService.controlador = "Usuarios";

    try {
      const res: any[] = await lastValueFrom(this.Api.get("usuarios"));
      this.displayedColumns = Object.keys(res[0]);
      this.dataSource.data = res;
      this.tableService.dataSource = res;
      this.displayedColumns.push(this.acciones);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    } catch (error) {
      console.error("Error al obtener los datos de la tabla:", error);
    }
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
