import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'SafePawsFront-End';
}
