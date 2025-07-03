import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { adoptions } from '../../../models/adoptions';
import { Adoptions } from '../../../services/adoptions';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listaradoptions',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './listaradoptions.html',
  styleUrl: './listaradoptions.css'
})
export class Listaradoptions implements OnInit {
  dataSource: MatTableDataSource<adoptions> = new MatTableDataSource();
  displayedColumns: string[] = [
    'c1',
    'c2',
    'c3',
    'c4',
    'c5',
    'c6',
    'acciones',
  ];
  filterValue: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private aS: Adoptions, private snackBar: MatSnackBar) {}
  ngOnInit(): void {
  this.aS.list().subscribe((data) => {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.filterPredicate = (data: adoptions, filter: string) => {
      const filterText = filter.trim().toLowerCase();
      return (
        data.nameClient?.toLowerCase().includes(filterText) ||
        data.namePet?.toLowerCase().includes(filterText)
      );
    };
    this.dataSource.paginator = this.paginator;
  });
  this.aS.getList().subscribe((data) => {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.filterPredicate = (data: adoptions, filter: string) => {
      const filterText = filter.trim().toLowerCase();
      return (
        data.nameClient?.toLowerCase().includes(filterText) ||
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
    this.aS.delete(id).subscribe({
      next: () => {
        this.aS.list().subscribe((data) => {
          this.aS.setList(data);
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
 