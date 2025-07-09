import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DTODonacionesPorUsuario } from '../../../models/DTODonacionesPorUsuario';
import { Donations } from '../../../services/donations';

@Component({
  selector: 'app-donacionescliente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './donacionescliente.html',
  styleUrl: './donacionescliente.css',
})
export class Donacionescliente implements OnInit {
  data: DTODonacionesPorUsuario[] = [];
  isLoading = true;

  constructor(private dS: Donations) {}

  ngOnInit() {
    this.dS.getAmountDonationByClient().subscribe({
      next: (res: DTODonacionesPorUsuario[]) => {
        this.data = res;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  getFullName(client: DTODonacionesPorUsuario): string {
    return `${client.name} ${client.lastName}`;
  }

  maxDonations(): number {
    return this.data.length > 0
      ? Math.max(...this.data.map((c) => c.totalDonations))
      : 1;
  }
}
