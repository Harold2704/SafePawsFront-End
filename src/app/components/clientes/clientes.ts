import { Component } from '@angular/core';
import { Listarclients } from './listarclients/listarclients';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [Listarclients, RouterOutlet],
  templateUrl: './clientes.html',
  styleUrl: './clientes.css'
})
export class Clientes {
  constructor(public router: ActivatedRoute) {}
}
