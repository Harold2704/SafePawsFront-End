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
import { comments } from '../../../models/comments';
import { shelters } from '../../../models/shelters';
import { clients } from '../../../models/clients';
import { Comments } from '../../../services/comments';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-creaeditacomments',
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
  templateUrl: './creaeditacomments.html',
  styleUrl: './creaeditacomments.css'
})
export class Creaeditacomments implements OnInit {
  form: FormGroup = new FormGroup({});
  comments: comments = new comments();
  shelters: shelters[] = [];
  clients: clients[] = [];

  listrating: { value: number; viewValue: number }[] = [
    { value: 1, viewValue: 1 },
    { value: 2, viewValue: 2 },
    { value: 3, viewValue: 3 },
    { value: 4, viewValue: 4 },
    { value: 5, viewValue: 5 },
  ];

  constructor(
    private cS: Comments,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      hdescription: ['', [Validators.required, Validators.minLength(8)]],
      hqualification: ['', [Validators.required]],
      hpublicationDate: ['', [Validators.required, this.fechaNoMayorHoyValidator()]],
      hidShelter: ['', [Validators.required]],
      hidClient: ['', [Validators.required]],
    });
    this.cS.getShelters().subscribe((data) => {
      this.shelters = data;
    });
    this.cS.getClients().subscribe((data) => {
      this.clients = data;
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
    this.comments.description = this.form.value.hdescription;
    this.comments.qualification = this.form.value.hqualification;
    this.comments.publicationDate = this.form.value.hpublicationDate;
    this.comments.idShelter = this.form.value.hidShelter;
    this.comments.idClient = this.form.value.hidClient;
    this.cS.insert(this.comments).subscribe({
      next: () => {
        this.cS.list().subscribe((d) => {
          this.cS.setList(d);
        });
        this.snackBar.open('Transacción registrada exitosamente', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        this.router.navigate(['/comments/list']);
      },
    });
  }

  cancelar(): void {
    this.router.navigate(['/comments/list']);
  }
}
