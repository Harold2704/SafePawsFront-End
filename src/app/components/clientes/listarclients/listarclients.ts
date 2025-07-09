import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { clients } from '../../../models/clients';
import { Clients } from '../../../services/clients';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listarclients',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './listarclients.html',
  styleUrl: './listarclients.css',
})
export class Listarclients implements OnInit {
  dataSource: MatTableDataSource<clients> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'accion01', 'accion02'];
  filterValue: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private cS: Clients, private snackBar: MatSnackBar, private router: Router) {}
  ngOnInit(): void {
    this.cS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.filterPredicate = (data: clients, filter: string) => {
        return data.dni?.toLowerCase().includes(filter.trim().toLowerCase());
      };
      this.dataSource.paginator = this.paginator;
    });
    this.cS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.filterPredicate = (data: clients, filter: string) => {
        return data.dni?.toLowerCase().includes(filter.trim().toLowerCase());
      };
      this.dataSource.paginator = this.paginator;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  eliminar(id: number) {
    this.cS.delete(id).subscribe({
      next: () => {
        this.cS.list().subscribe((data) => {
          this.cS.setList(data);
        });
        this.snackBar.open('Eliminación exitosa', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      },
      error: () => {
        this.snackBar.open('No se puede realizar la eliminación', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      },
    });
  }

  editar(id: number) {
    console.log(`Editando cliente con ID: ${id}`);
    this.router.navigate(['/client/modification', id]);
  }
}
