import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { vaccinepets } from '../../../models/vaccinepets';
import { Vaccinepets } from '../../../services/vaccinepets';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listarvaccinepets',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './listarvaccinepets.html',
  styleUrl: './listarvaccinepets.css',
})
export class Listarvaccinepets implements OnInit {
  dataSource: MatTableDataSource<vaccinepets> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'acciones'];
  filterValue: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private vS: Vaccinepets, private snackBar: MatSnackBar) {}
  ngOnInit(): void {
    this.vS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.filterPredicate = (data: vaccinepets, filter: string) => {
        const filterText = filter.trim().toLowerCase();
        return (
          data.nameVaccine?.toLowerCase().includes(filterText) ||
          data.namePet?.toLowerCase().includes(filterText)
        );
      };
      this.dataSource.paginator = this.paginator;
    });
    this.vS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.filterPredicate = (data: vaccinepets, filter: string) => {
        const filterText = filter.trim().toLowerCase();
        return (
          data.nameVaccine?.toLowerCase().includes(filterText) ||
          data.namePet?.toLowerCase().includes(filterText)
        );
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
    this.vS.delete(id).subscribe({
      next: () => {
        this.vS.list().subscribe((data) => {
          this.vS.setList(data);
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
}
