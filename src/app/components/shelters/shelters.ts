import { Component } from '@angular/core';
import { Listarshelters } from './listarshelters/listarshelters';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-shelters',
  standalone: true,
  imports: [Listarshelters, RouterOutlet],
  templateUrl: './shelters.html',
  styleUrl: './shelters.css'
})
export class Shelters {
  constructor(public router: ActivatedRoute) { }
}
