import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { medicalhistories } from '../../../models/medicalhistories';
import { Medicalhistories } from '../../../services/medicalhistories';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listarmedicalhistories',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './listarmedicalhistories.html',
  styleUrl: './listarmedicalhistories.css',
})
export class Listarmedicalhistories implements OnInit {
  dataSource: MatTableDataSource<medicalhistories> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'accion01', 'accion02'];
  filterValue: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private mS: Medicalhistories, private snackBar: MatSnackBar, private router: Router) {}
  ngOnInit(): void {
    this.mS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.filterPredicate = (
        data: medicalhistories,
        filter: string
      ) => {
        return data.veterinarian
          ?.toLowerCase()
          .includes(filter.trim().toLowerCase());
      };
      this.dataSource.paginator = this.paginator;
    });
    this.mS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.filterPredicate = (
        data: medicalhistories,
        filter: string
      ) => {
        return data.veterinarian
          ?.toLowerCase()
          .includes(filter.trim().toLowerCase());
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
    this.mS.delete(id).subscribe({
      next: () => {
        this.mS.list().subscribe((data) => {
          this.mS.setList(data);
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
    console.log(`Editando historial medico con ID: ${id}`);
    this.router.navigate(['/medicalhistory/modification', id]);
  }
}
