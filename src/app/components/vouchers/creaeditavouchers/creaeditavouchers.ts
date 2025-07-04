import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { vouchers } from '../../../models/vouchers';
import { Vouchers } from '../../../services/vouchers';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-creaeditavouchers',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './creaeditavouchers.html',
  styleUrl: './creaeditavouchers.css'
})
export class Creaeditavouchers implements OnInit {
  form: FormGroup = new FormGroup({});
  vouchers: vouchers = new vouchers();

  listmethod: { value: string; viewValue: string }[] = [
    { value: 'Efectivo', viewValue: 'Efectivo' },
    { value: 'Tarjeta', viewValue: 'Tarjeta' },
  ];

  constructor(
    private vS: Vouchers,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      hcodeVoucher: ['', [Validators.required, Validators.minLength(8)]],
      hmethod: ['', [Validators.required]],
      hstate: [false, Validators.required],
    });
  }

  aceptar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.vouchers.codeVoucher = this.form.value.hcodeVoucher;
    this.vouchers.method = this.form.value.hmethod;
    this.vouchers.state = this.form.value.hstate;
    this.vS.insert(this.vouchers).subscribe({
      next: () => {
        this.vS.list().subscribe((d) => {
          this.vS.setList(d);
        });
        this.snackBar.open('Transacción registrada exitosamente', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        this.router.navigate(['/voucher/list']);
      },
    });
  }

  cancelar(): void {
    this.router.navigate(['/voucher/list']);
  }
}
