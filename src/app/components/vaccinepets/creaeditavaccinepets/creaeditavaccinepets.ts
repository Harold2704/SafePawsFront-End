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
import { vaccinepets } from '../../../models/vaccinepets';
import { vaccines } from '../../../models/vaccines';
import { pets } from '../../../models/pets';
import { Vaccinepets } from '../../../services/vaccinepets';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-creaeditavaccinepets',
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
  templateUrl: './creaeditavaccinepets.html',
  styleUrl: './creaeditavaccinepets.css'
})
export class Creaeditavaccinepets implements OnInit {
  form: FormGroup = new FormGroup({});
  vaccinepets: vaccinepets = new vaccinepets();
  vaccines: vaccines[] = [];
  pets: pets[] = [];
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private vS: Vaccinepets,
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
      hdateApplication: ['', [Validators.required, this.fechaNoMayorHoyValidator()]],
      hidVaccine: ['', [Validators.required]],
      hidPet: ['', [Validators.required]],
    });

    this.vS.getVaccines().subscribe((data) => {
      this.vaccines = data;
    });

    this.vS.getPets().subscribe((data) => {
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
    this.vaccinepets.dateApplication = this.form.value.hdateApplication;
    this.vaccinepets.idVaccine = this.form.value.hidVaccine;
    this.vaccinepets.idPet = this.form.value.hidPet;

    if (this.edicion) {
      this.vS.update(this.id, this.vaccinepets).subscribe(() => {
        this.vS.list().subscribe((d) => {
          this.vS.setList(d);
        });
        this.snackBar.open('Edición exitosa', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        this.router.navigate(['/vaccinePet/list']);
      });
    } else {
      this.vS.insert(this.vaccinepets).subscribe(() => {
        this.vS.list().subscribe((d) => {
          this.vS.setList(d);
        });
        this.snackBar.open('Registro exitoso', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        this.router.navigate(['/vaccinePet/list']);
      });
    }
  }

  init() {
    if (this.edicion) {
      this.vS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hdateApplication: new FormControl(data.dateApplication),
          hidVaccine: new FormControl(data.idVaccine),
          hidPet: new FormControl(data.idPet),
        });
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/vaccinePet/list']);
  }
}
