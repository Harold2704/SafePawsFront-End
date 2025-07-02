import { Component } from '@angular/core';
import { Listarcomments } from './listarcomments/listarcomments';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [Listarcomments, RouterOutlet],
  templateUrl: './comments.html',
  styleUrl: './comments.css'
})
export class Comments {
  constructor(public router: ActivatedRoute) {}
}
