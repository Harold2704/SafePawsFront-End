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
import { races } from '../../../models/races';
import { Races } from '../../../services/races';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-creaeditaraces',
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
  templateUrl: './creaeditaraces.html',
  styleUrl: './creaeditaraces.css'
})
export class Creaeditaraces implements OnInit {
  form: FormGroup = new FormGroup({});
  races: races = new races();
  id: number = 0;
  edicion: boolean = false;

  listspecies: { value: string; viewValue: string }[] = [
    { value: 'Perro', viewValue: 'Perro' },
    { value: 'Gato', viewValue: 'Gato' },
  ];

  constructor(
    private rS: Races,
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
      hspecies: ['', [Validators.required]],
    });
  }

  aceptar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.races.name = this.form.value.hname;
    this.races.species = this.form.value.hspecies;

    if (this.edicion) {
      this.rS.update(this.id, this.races).subscribe(() => {
        this.rS.list().subscribe((d) => {
          this.rS.setList(d);
        });
        this.snackBar.open('Edición exitosa', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        this.router.navigate(['/race/list']);
      });
    } else {
      this.rS.insert(this.races).subscribe(() => {
        this.rS.list().subscribe((d) => {
          this.rS.setList(d);
        });
        this.snackBar.open('Registro exitoso', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        this.router.navigate(['/race/list']);
      });
    }
  }

  init() {
    if (this.edicion) {
      this.rS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hname: new FormControl(data.name),
          hspecies: new FormControl(data.species),
        });
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/race/list']);
  }
}
