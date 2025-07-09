import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Clients } from '../../../services/clients';
import { DTOAdopcionesPorCliente } from '../../../models/DTOAdopcionesPorCliente';

@Component({
  selector: 'app-adopcionescliente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './adopcionescliente.html',
  styleUrl: './adopcionescliente.css'
})
export class Adopcionescliente implements OnInit {
  data: DTOAdopcionesPorCliente[] = [];
  isLoading = true;

  constructor(private cS: Clients) {}

  ngOnInit() {
    this.cS.getAdoptionsByClient().subscribe({
      next: (res: DTOAdopcionesPorCliente[]) => {
        this.data = res;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  getFullName(client: DTOAdopcionesPorCliente): string {
    return `${client.name} ${client.lasName}`;
  }

  maxAdoptions(): number {
    return this.data.length > 0 ? Math.max(...this.data.map(c => c.totalAdopciones)) : 1;
  }
}
