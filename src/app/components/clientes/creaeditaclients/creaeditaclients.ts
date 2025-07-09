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
import { clients } from '../../../models/clients';
import { users } from '../../../models/users';
import { Clients } from '../../../services/clients';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-creaeditaclients',
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
  templateUrl: './creaeditaclients.html',
  styleUrl: './creaeditaclients.css',
})
export class Creaeditaclients implements OnInit {
  form: FormGroup = new FormGroup({});
  clients: clients = new clients();
  users: users[] = [];
  id: number = 0;
  edicion: boolean = false;

  listgender: { value: string; viewValue: string }[] = [
    { value: 'Hombre', viewValue: 'Hombre' },
    { value: 'Mujer', viewValue: 'Mujer' },
    { value: 'Otro', viewValue: 'Otro' },
  ];

  constructor(
    private cS: Clients,
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
      hlastName: ['', [Validators.required, Validators.minLength(4)]],
      hdni: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(8),
          Validators.pattern('^[0-9]{8}$'),
        ],
      ],
      hgender: ['', [Validators.required]],
      hemail: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.minLength(11),
          Validators.pattern('^[a-zA-Z0-9._%+-]+@gmail\\.com$'),
        ],
      ],
      hnumber: [
        '',
        [
          Validators.required,
          Validators.minLength(9),
          Validators.maxLength(9),
          Validators.pattern('^[0-9]{9}$'),
        ],
      ],
      hadress: ['', [Validators.required, Validators.minLength(11)]],
      hidUser: ['', [Validators.required]],
    });

    this.cS.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  aceptar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.clients.name = this.form.value.hname;
    this.clients.lastName = this.form.value.hlastName;
    this.clients.dni = this.form.value.hdni;
    this.clients.gender = this.form.value.hgender;
    this.clients.email = this.form.value.hemail;
    this.clients.number = this.form.value.hnumber;
    this.clients.adress = this.form.value.hadress;
    this.clients.idUser = this.form.value.hidUser;

    if (this.edicion) {
      this.cS.update(this.id, this.clients).subscribe(() => {
        this.cS.list().subscribe((data) => {
          this.cS.setList(data);
        });
        this.snackBar.open('Edición exitosa', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        this.router.navigate(['/client/list']);
      });
    } else {
      this.cS.insert(this.clients).subscribe(() => {
        this.cS.list().subscribe((data) => {
          this.cS.setList(data);
        });
        this.snackBar.open('Registro exitoso', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        this.router.navigate(['/client/list']);
      });
    }
  }

  init() {
    if (this.edicion) {
      this.cS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hname: new FormControl(data.name),
          hlastName: new FormControl(data.lastName),
          hdni: new FormControl(data.dni),
          hgender: new FormControl(data.gender),
          hemail: new FormControl(data.email),
          hnumber: new FormControl(data.number),
          hadress: new FormControl(data.adress),
          hidUser: new FormControl(data.idUser),
        });
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/client/list']);
  }
}
