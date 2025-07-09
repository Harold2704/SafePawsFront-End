import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
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
import { ActivatedRoute, Params, Router } from '@angular/router';
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
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private mS: Medicalhistories,
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

    if (this.edicion) {
      this.mS.update(this.id, this.medicalhistories).subscribe(() => {
        this.mS.list().subscribe((d) => {
          this.mS.setList(d);
        });
        this.snackBar.open('Edición exitosa', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        this.router.navigate(['/medicalhistory/list']);
      });
    } else {
      this.mS.insert(this.medicalhistories).subscribe(() => {
        this.mS.list().subscribe((d) => {
          this.mS.setList(d);
        });
        this.snackBar.open('Registro exitoso', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        this.router.navigate(['/medicalhistory/list']);
      });
    }
  }

  init() {
    if (this.edicion) {
      this.mS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hdateMedicalHistory: new FormControl(data.dateMedicalHistory),
          hdiagnostic: new FormControl(data.diagnostic),
          hveterinarian: new FormControl(data.veterinarian),
          hidPet: new FormControl(data.idPet),
        });
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/medicalhistory/list']);
  }
}
