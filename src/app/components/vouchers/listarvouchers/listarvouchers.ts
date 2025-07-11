import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { vouchers } from '../../../models/vouchers';
import { Vouchers } from '../../../services/vouchers';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listarvouchers',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './listarvouchers.html',
  styleUrl: './listarvouchers.css',
})
export class Listarvouchers implements OnInit {
  dataSource: MatTableDataSource<vouchers> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'accion01', 'accion02'];
  filterValue: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private vS: Vouchers, private snackBar: MatSnackBar, private router: Router) {}
  ngOnInit(): void {
    this.vS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.filterPredicate = (data: vouchers, filter: string) => {
        return data.codeVoucher?.toLowerCase().includes(filter.trim().toLowerCase());
      };
      this.dataSource.paginator = this.paginator;
    });
    this.vS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.filterPredicate = (data: vouchers, filter: string) => {
        return data.codeVoucher?.toLowerCase().includes(filter.trim().toLowerCase());
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

  editar(id: number) {
    console.log(`Editando comprobante con ID: ${id}`);
    this.router.navigate(['/voucher/modification', id]);
  }
}
