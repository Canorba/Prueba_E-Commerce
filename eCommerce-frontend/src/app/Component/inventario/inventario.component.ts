import { ApiService } from '../../Services/api.service';
import { FormularioInventarioComponent } from '../../Forms/formulario-inventario/formulario-inventario.component';
import { TableService } from '../../Services/table.service';
import { MatDialog } from '@angular/material/dialog';
import { FormsService } from '../../Services/forms.service';
import { TableTemplateComponent } from "../table-template/table-template.component";
import { lastValueFrom } from 'rxjs';
import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [TableTemplateComponent],
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.css'
})
export class InventarioComponent {

  column?:Object;
  displayedColumns: string[]=[]
  dataSource!: MatTableDataSource<any>; 
  acciones = 'acciones';
  Componenente?: String;
  titulo="Inventarios";
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private Api: ApiService,public tableService: TableService,public dialog: MatDialog,public forms: FormsService){
    this.dataSource=new MatTableDataSource();
  }

  ngOnInit(): void {
      this.Getdocente();
     
  }

  openModal() {
    const dialogRef = this.dialog.open(FormularioInventarioComponent);

  }

  async Getdocente() {
    this.tableService.titleTabla = "Inventarios";
    this.tableService.controlador = "Inventarios";

    try {
      const res: any[] = await lastValueFrom(this.Api.get("inventarios"));
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
