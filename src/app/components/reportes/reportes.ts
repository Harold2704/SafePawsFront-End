import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Adopcionescliente } from './adopcionescliente/adopcionescliente';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [RouterOutlet, Adopcionescliente],
  templateUrl: './reportes.html',
  styleUrl: './reportes.css'
})
export class Reportes {
  constructor(public router: ActivatedRoute) {}
}
