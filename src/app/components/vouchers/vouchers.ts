import { Component } from '@angular/core';
import { Listarvouchers } from './listarvouchers/listarvouchers';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-vouchers',
  standalone: true,
  imports: [Listarvouchers, RouterOutlet],
  templateUrl: './vouchers.html',
  styleUrl: './vouchers.css'
})
export class Vouchers {
  constructor(public router: ActivatedRoute) { }
}
