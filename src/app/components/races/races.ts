import { Component } from '@angular/core';
import { Listarraces } from './listarraces/listarraces';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-races',
  standalone: true,
  imports: [Listarraces, RouterOutlet],
  templateUrl: './races.html',
  styleUrl: './races.css'
})
export class Races {
  constructor(public router: ActivatedRoute) { }
}
