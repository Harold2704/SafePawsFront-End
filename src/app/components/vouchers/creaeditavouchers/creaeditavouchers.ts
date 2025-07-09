import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { vouchers } from '../../../models/vouchers';
import { Vouchers } from '../../../services/vouchers';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
  id: number = 0;
  edicion: boolean = false;

  listmethod: { value: string; viewValue: string }[] = [
    { value: 'Efectivo', viewValue: 'Efectivo' },
    { value: 'Tarjeta', viewValue: 'Tarjeta' },
  ];

  constructor(
    private vS: Vouchers,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

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

    if (this.edicion) {
      this.vS.update(this.id, this.vouchers).subscribe(() => {
        this.vS.list().subscribe((d) => {
          this.vS.setList(d);
        });
        this.snackBar.open('Edición exitosa', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        this.router.navigate(['/voucher/list']);
      });
    } else {
      this.vS.insert(this.vouchers).subscribe(() => {
        this.vS.list().subscribe((d) => {
          this.vS.setList(d);
        });
        this.snackBar.open('Registro exitoso', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        this.router.navigate(['/voucher/list']);
      });
    }
  }

  init() {
    if (this.edicion) {
      this.vS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodeVoucher: new FormControl(data.codeVoucher),
          hmethod: new FormControl(data.method),
          hstate: new FormControl(data.state),
        });
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/voucher/list']);
  }
}
