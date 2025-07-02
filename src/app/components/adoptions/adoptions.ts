import { Component } from '@angular/core';
import { Listaradoptions } from './listaradoptions/listaradoptions';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-adoptions',
  standalone: true,
  imports: [Listaradoptions, RouterOutlet],
  templateUrl: './adoptions.html',
  styleUrl: './adoptions.css'
})
export class Adoptions {
  constructor(public router: ActivatedRoute) {}
}
