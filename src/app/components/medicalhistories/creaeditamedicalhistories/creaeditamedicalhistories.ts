import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { medicalhistories } from '../../../models/medicalhistories';
import { pets } from '../../../models/pets';
import { Medicalhistories } from '../../../services/medicalhistories';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-creaeditamedicalhistories',
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
  templateUrl: './creaeditamedicalhistories.html',
  styleUrl: './creaeditamedicalhistories.css'
})
export class Creaeditamedicalhistories implements OnInit {
  form: FormGroup = new FormGroup({});
  medicalhistories: medicalhistories = new medicalhistories();
  pets: pets[] = [];

  constructor(
    private mS: Medicalhistories,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      hdateMedicalHistory: ['', [Validators.required, this.fechaNoMayorHoyValidator()]],
      hdiagnostic: ['', [Validators.required, Validators.minLength(10)]],
      hveterinarian: ['', [Validators.required, Validators.minLength(4)]],
      hidPet: ['', [Validators.required]],
    });
    this.mS.getPets().subscribe((data) => {
      this.pets = data;
    });
  }

  fechaNoMayorHoyValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      if (!control.value) return null;
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);
      const fecha = new Date(control.value);
      fecha.setHours(0, 0, 0, 0);
      return fecha > hoy ? { fechaMenorHoy: true } : null;
    };
  }

  aceptar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.medicalhistories.dateMedicalHistory = this.form.value.hdateMedicalHistory;
    this.medicalhistories.diagnostic = this.form.value.hdiagnostic;
    this.medicalhistories.veterinarian = this.form.value.hveterinarian;
    this.medicalhistories.idPet = this.form.value.hidPet;
    this.mS.insert(this.medicalhistories).subscribe({
      next: () => {
        this.mS.list().subscribe((d) => {
          this.mS.setList(d);
        });
        this.snackBar.open('Transacción registrada exitosamente', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        this.router.navigate(['/medicalhistory/list']);
      },
    });
  }

  cancelar(): void {
    this.router.navigate(['/medicalhistory/list']);
  }
}
