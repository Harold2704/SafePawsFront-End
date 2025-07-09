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
import { donations } from '../../../models/donations';
import { vouchers } from '../../../models/vouchers';
import { clients } from '../../../models/clients';
import { shelters } from '../../../models/shelters';
import { Donations } from '../../../services/donations';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-creaeditadonations',
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
  templateUrl: './creaeditadonations.html',
  styleUrl: './creaeditadonations.css'
})
export class Creaeditadonations implements OnInit {
  form: FormGroup = new FormGroup({});
  donations: donations = new donations();
  shelters: shelters[] = [];
  clients: clients[] = [];
  vouchers: vouchers[] = [];
  id: number = 0;
  edicion: boolean = false;

  listtype: { value: string; viewValue: string }[] = [
    { value: "Voluntariado", viewValue: "Voluntariado" },
    { value: "Colaborativo", viewValue: "Colaborativo" },
  ];

  constructor(
    private dS: Donations,
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
      hdonationDate: ['', [Validators.required, this.fechaNoMayorHoyValidator()]],
      htype: ['', [Validators.required]],
      hamount: ['', [Validators.required, Validators.min(0)]],
      hdetail: ['', [Validators.required, Validators.minLength(10)]],
      hidShelter: ['', [Validators.required]],
      hidClient: ['', [Validators.required]],
      hidVoucher: ['', [Validators.required]],
    });

    this.dS.getShelters().subscribe((data) => {
      this.shelters = data;
    });

    this.dS.getClients().subscribe((data) => {
      this.clients = data;
    });

    this.dS.getVouchers().subscribe((data) => {
      this.vouchers = data;
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
    this.donations.donationDate = this.form.value.hdonationDate;
    this.donations.type = this.form.value.htype;
    this.donations.amount = this.form.value.hamount;
    this.donations.detail = this.form.value.hdetail;
    this.donations.idShelter = this.form.value.hidShelter;
    this.donations.idClient = this.form.value.hidClient;
    this.donations.idVoucher = this.form.value.hidVoucher;

    if (this.edicion) {
      this.dS.update(this.id, this.donations).subscribe(() => {
        this.dS.list().subscribe((d) => {
          this.dS.setList(d);
        });
        this.snackBar.open('Edición exitosa', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        this.router.navigate(['/donations/list']);
      });
    } else {
      this.dS.insert(this.donations).subscribe(() => {
        this.dS.list().subscribe((d) => {
          this.dS.setList(d);
        });
        this.snackBar.open('Registro exitoso', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        this.router.navigate(['/donations/list']);
      });
    }
  }

  init() {
    if (this.edicion) {
      this.dS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hdonationDate: new FormControl(data.donationDate),
          htype: new FormControl(data.type),
          hamount: new FormControl(data.amount),
          hdetail: new FormControl(data.detail),
          hidShelter: new FormControl(data.idShelter),
          hidClient: new FormControl(data.idClient),
          hidVoucher: new FormControl(data.idVoucher),
        });
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/donations/list']);
  }
}
