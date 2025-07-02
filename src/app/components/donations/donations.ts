import { Component } from '@angular/core';
import { Listardonations } from './listardonations/listardonations';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-donations',
  standalone: true,
  imports: [Listardonations, RouterOutlet],
  templateUrl: './donations.html',
  styleUrl: './donations.css'
})
export class Donations {
  constructor(public router: ActivatedRoute) {}
}
