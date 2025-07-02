import { Component } from '@angular/core';
import { Listarpets } from './listarpets/listarpets';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-pets',
  standalone: true,
  imports: [Listarpets, RouterOutlet],
  templateUrl: './pets.html',
  styleUrl: './pets.css'
})
export class Pets {
  constructor(public router: ActivatedRoute) {}
}
