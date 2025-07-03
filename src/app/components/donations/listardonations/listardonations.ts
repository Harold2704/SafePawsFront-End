import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { donations } from '../../../models/donations';
import { Donations } from '../../../services/donations';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listardonations',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './listardonations.html',
  styleUrl: './listardonations.css'
})
export class Listardonations implements OnInit {
  dataSource: MatTableDataSource<donations> = new MatTableDataSource();
  displayedColumns: string[] = [
    'c1',
    'c2',
    'c3',
    'c4',
    'c5',
    'c6',
    'c7',
    'c8',
    'acciones',
  ];
  filterValue: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dS: Donations, private snackBar: MatSnackBar) {}
  ngOnInit(): void {
    this.dS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.filterPredicate = (data: donations, filter: string) => {
        return data.nameClient?.toLowerCase().includes(filter.trim().toLowerCase()) ||
               data.nameShelter?.toLowerCase().includes(filter.trim().toLowerCase());
      };
      this.dataSource.paginator = this.paginator;
    });
    this.dS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.filterPredicate = (data: donations, filter: string) => {
        return data.nameClient?.toLowerCase().includes(filter.trim().toLowerCase()) ||
               data.nameShelter?.toLowerCase().includes(filter.trim().toLowerCase());
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
    this.dS.delete(id).subscribe({
      next: () => {
        this.dS.list().subscribe((data) => {
          this.dS.setList(data);
        });
        this.snackBar.open('Eliminación exitosa', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      },
    });
  }
}
