import { Component } from '@angular/core';
import { Listarvaccinepets } from './listarvaccinepets/listarvaccinepets';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-vaccinepets',
  standalone: true,
  imports: [Listarvaccinepets, RouterOutlet],
  templateUrl: './vaccinepets.html',
  styleUrl: './vaccinepets.css'
})
export class Vaccinepets {
  constructor(public router: ActivatedRoute) { }
}
