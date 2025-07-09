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
import { vaccines } from '../../../models/vaccines';
import { Vaccines } from '../../../services/vaccines';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private vS: Vaccines,
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

    if (this.edicion) {
      this.vS.update(this.id, this.vaccines).subscribe(() => {
        this.vS.list().subscribe((d) => {
          this.vS.setList(d);
        });
        this.snackBar.open('Edición exitosa', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        this.router.navigate(['/vaccine/list']);
      });
    } else {
      this.vS.insert(this.vaccines).subscribe(() => {
        this.vS.list().subscribe((d) => {
          this.vS.setList(d);
        });
        this.snackBar.open('Registro exitoso', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        this.router.navigate(['/vaccine/list']);
      });
    }
  }

  init() {
    if (this.edicion) {
      this.vS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hname: new FormControl(data.name),
          hdescription: new FormControl(data.description),
        });
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/vaccine/list']);
  }
}
