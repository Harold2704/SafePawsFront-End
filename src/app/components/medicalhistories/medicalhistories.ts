import { Component } from '@angular/core';
import { Listarmedicalhistories } from './listarmedicalhistories/listarmedicalhistories';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-medicalhistories',
  standalone: true,
  imports: [Listarmedicalhistories, RouterOutlet],
  templateUrl: './medicalhistories.html',
  styleUrl: './medicalhistories.css'
})
export class Medicalhistories {
  constructor(public router: ActivatedRoute) {}
}
