import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { shelters } from '../../../models/shelters';
import { users } from '../../../models/users';
import { Shelters } from '../../../services/shelters';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-creaeditashelters',
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
  templateUrl: './creaeditashelters.html',
  styleUrl: './creaeditashelters.css',
})
export class Creaeditashelters implements OnInit {
  form: FormGroup = new FormGroup({});
  shelters: shelters = new shelters();
  users: users[] = [];
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private sS: Shelters,
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
      hnumber: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern('^[0-9]{9}$')]],
      hemail: ['', [Validators.required, Validators.email, Validators.minLength(11), Validators.pattern('^[a-zA-Z0-9._%+-]+@gmail\\.com$')]],
      hadress: ['', [Validators.required, Validators.minLength(11)]],
      hopeningDate: ['', [Validators.required, this.fechaNoMayorHoyValidator()]],
      hability: ['', [Validators.required, Validators.min(0)]],
      hidUser: ['', [Validators.required]],
    });

    this.sS.getUsers().subscribe((data) => {
      this.users = data;
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
    this.shelters.name = this.form.value.hname;
    this.shelters.number = this.form.value.hnumber;
    this.shelters.email = this.form.value.hemail;
    this.shelters.adress = this.form.value.hadress;
    this.shelters.openingDate = this.form.value.hopeningDate;
    this.shelters.ability = this.form.value.hability;
    this.shelters.idUser = this.form.value.hidUser;

    if (this.edicion) {
      this.sS.update(this.id, this.shelters).subscribe(() => {
        this.sS.list().subscribe((d) => {
          this.sS.setList(d);
        });
        this.snackBar.open('Edición exitosa', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        this.router.navigate(['/shelter/list']);
      });
    } else {
      this.sS.insert(this.shelters).subscribe(() => {
        this.sS.list().subscribe((d) => {
          this.sS.setList(d);
        });
        this.snackBar.open('Registro exitoso', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        this.router.navigate(['/shelter/list']);
      });
    }
  }

  init() {
    if (this.edicion) {
      this.sS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hname: new FormControl(data.name),
          hnumber: new FormControl(data.number),
          hemail: new FormControl(data.email),
          hadress: new FormControl(data.adress),
          hopeningDate: new FormControl(data.openingDate),
          hability: new FormControl(data.ability),
          hidUser: new FormControl(data.idUser),
        });
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/shelter/list']);
  }
}
