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
import { adoptions } from '../../../models/adoptions';
import { pets } from '../../../models/pets';
import { clients } from '../../../models/clients';
import { Adoptions } from '../../../services/adoptions';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-creaeditaadoptions',
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
  templateUrl: './creaeditaadoptions.html',
  styleUrl: './creaeditaadoptions.css'
})
export class Creaeditaadoptions implements OnInit {
  form: FormGroup = new FormGroup({});
  adoptions: adoptions = new adoptions();
  clients: clients[] = [];
  pets: pets[] = [];

  constructor(
    private aS: Adoptions,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      hobservation: ['', [Validators.required, Validators.minLength(10)]],
      hdateAdoption: ['', [Validators.required, this.fechaNoMayorHoyValidator()]],
      hstatus: [false, Validators.required],
      hidClient: ['', [Validators.required]],
      hidPet: ['', [Validators.required]],
    });
    this.aS.getClients().subscribe((data) => {
      this.clients = data;
    });
    this.aS.getPets().subscribe((data) => {
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
    this.adoptions.observation = this.form.value.hobservation;
    this.adoptions.dateAdoption = this.form.value.hdateAdoption;
    this.adoptions.status = this.form.value.hstatus;
    this.adoptions.idClient = this.form.value.hidClient;
    this.adoptions.idPet = this.form.value.hidPet;
    this.aS.insert(this.adoptions).subscribe({
      next: () => {
        this.aS.list().subscribe((d) => {
          this.aS.setList(d);
        });
        this.snackBar.open('Transacción registrada exitosamente', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        this.router.navigate(['/adoption/list']);
      },
    });
  }

  cancelar(): void {
    this.router.navigate(['/adoption/list']);
  }
}
