import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Shelters } from '../../../services/shelters';
import { DTOResumenAdopcionesPorRefugio } from '../../../models/DTOResumenAdopcionesPorRefugio';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-resumenadopciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resumenadopciones.html',
  styleUrl: './resumenadopciones.css',
})
export class Resumenadopciones implements OnInit {
  @ViewChild('barCanvas', { static: true })
  barCanvas!: ElementRef<HTMLCanvasElement>;
  resumen: DTOResumenAdopcionesPorRefugio[] = [];
  chart: any;
  loading: boolean = true;

  constructor(private sheltersService: Shelters) {}

  ngOnInit(): void {
    this.sheltersService.getSummaryAdoptionsByShelter().subscribe(
      (data) => {
        this.resumen = data;
        this.createChart();
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }

  createChart() {
    if (this.chart) {
      this.chart.destroy();
    }
    this.chart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: this.resumen.map((x) => x.nombreAlbergue),
        datasets: [
          {
            label: 'Mascotas Adoptadas',
            data: this.resumen.map((x) => x.mascotasAdoptadas),
            backgroundColor: '#4caf50',
          },
          {
            label: 'Mascotas No Adoptadas',
            data: this.resumen.map((x) => x.mascotasNoAdoptadas),
            backgroundColor: '#f44336',
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true },
        },
      },
    });
  }
}
