import { Component } from '@angular/core';
import { Listarvaccines } from './listarvaccines/listarvaccines';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-vaccines',
  standalone: true,
  imports: [Listarvaccines, RouterOutlet],
  templateUrl: './vaccines.html',
  styleUrl: './vaccines.css'
})
export class Vaccines {
  constructor(public router: ActivatedRoute) { }
}
