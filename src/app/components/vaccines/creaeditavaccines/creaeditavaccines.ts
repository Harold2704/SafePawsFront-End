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
import { vaccines } from '../../../models/vaccines';
import { Vaccines } from '../../../services/vaccines';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-creaeditavaccines',
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
  templateUrl: './creaeditavaccines.html',
  styleUrl: './creaeditavaccines.css'
})
export class Creaeditavaccines implements OnInit {
  form: FormGroup = new FormGroup({});
  vaccines: vaccines = new vaccines();

  constructor(
    private vS: Vaccines,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      hname: ['', [Validators.required, Validators.minLength(4)]],
      hdescription: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  aceptar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.vaccines.name = this.form.value.hname;
    this.vaccines.description = this.form.value.hdescription;
    this.vS.insert(this.vaccines).subscribe({
      next: () => {
        this.vS.list().subscribe((d) => {
          this.vS.setList(d);
        });
        this.snackBar.open('Transacción registrada exitosamente', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        this.router.navigate(['/vaccine/list']);
      },
    });
  }

  cancelar(): void {
    this.router.navigate(['/vaccine/list']);
  }
}
