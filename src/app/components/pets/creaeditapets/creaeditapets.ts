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
import { pets } from '../../../models/pets';
import { shelters } from '../../../models/shelters';
import { races } from '../../../models/races';
import { Pets } from '../../../services/pets';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-creaeditapets',
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
  templateUrl: './creaeditapets.html',
  styleUrl: './creaeditapets.css',
})
export class Creaeditapets implements OnInit {
  form: FormGroup = new FormGroup({});
  pets: pets = new pets();
  shelters: shelters[] = [];
  races: races[] = [];
  id: number = 0;
  edicion: boolean = false;

  listsex: { value: string; viewValue: string }[] = [
    { value: "Macho", viewValue: "Macho" },
    { value: "Hembra", viewValue: "Hembra" },
  ];

  constructor(
    private pS: Pets,
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
      hname: ['', [Validators.required, Validators.minLength(4)]],
      hsex: ['', [Validators.required]],
      hbirthdate: ['', [Validators.required, this.fechaNoMayorHoyValidator()]],
      hweight: ['', [Validators.required, Validators.min(5), Validators.max(60)]],
      hdescription: ['', [Validators.required, Validators.minLength(10)]],
      hstatus: [false, [Validators.required]],
      hidShelter: ['', [Validators.required]],
      hidRace: ['', [Validators.required]],
    });

    this.pS.getShelters().subscribe((data) => {
      this.shelters = data;
    });

    this.pS.getRaces().subscribe((data) => {
      this.races = data;
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
    this.pets.name = this.form.value.hname;
    this.pets.sex = this.form.value.hsex;
    this.pets.birthdate = this.form.value.hbirthdate;
    this.pets.weight = this.form.value.hweight;
    this.pets.description = this.form.value.hdescription;
    this.pets.status = this.form.value.hstatus;
    this.pets.idShelter = this.form.value.hidShelter;
    this.pets.idRace = this.form.value.hidRace;

    if (this.edicion) {
      this.pS.update(this.id, this.pets).subscribe(() => {
        this.pS.list().subscribe((d) => {
          this.pS.setList(d);
        });
        this.snackBar.open('Edición exitosa', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        this.router.navigate(['/pet/list']);
      });
    } else {
      this.pS.insert(this.pets).subscribe(() => {
        this.pS.list().subscribe((d) => {
          this.pS.setList(d);
        });
        this.snackBar.open('Registro exitoso', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        this.router.navigate(['/pet/list']);
      });
    }
  }

  init() {
    if (this.edicion) {
      this.pS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hname: new FormControl(data.name),
          hsex: new FormControl(data.sex),
          hbirthdate: new FormControl(data.birthdate),
          hweight: new FormControl(data.weight),
          hdescription: new FormControl(data.description),
          hstatus: new FormControl(data.status),
          hidShelter: new FormControl(data.idShelter),
          hidRace: new FormControl(data.idRace),
        });
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/pet/list']);
  }
}
