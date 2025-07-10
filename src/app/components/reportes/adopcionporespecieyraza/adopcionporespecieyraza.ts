import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  Chart,
  ChartDataset,
  ChartOptions,
  ChartType,
  registerables,
} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Pets } from '../../../services/pets';
import { DTOEspecieConRazas } from '../../../models/DTOEspecieConRazas';

Chart.register(...registerables);

@Component({
  selector: 'app-adopcionporespecieyraza',
  standalone: true,
  imports: [BaseChartDirective, CommonModule],
  templateUrl: './adopcionporespecieyraza.html',
  styleUrl: './adopcionporespecieyraza.css',
})
export class Adopcionporespecieyraza implements OnInit {
  loading = true;
  reporte: DTOEspecieConRazas[] = [];
  chartOptions: ChartOptions = { responsive: true };
  chartType: ChartType = 'bar';
  chartLegend = false;
  chartData: { [key: string]: ChartDataset[] } = {};
  chartLabels: { [key: string]: string[] } = {};
  chartColors = [
    '#4e79a7', '#f28e2b', '#e15759', '#76b7b2', '#59a14f',
    '#edc949', '#af7aa1', '#ff9da7', '#9c755f', '#bab0ab'
  ];

  constructor(private petsService: Pets) {}

  ngOnInit() {
    this.petsService.getPetAdoptedBySpeciesAndBreed().subscribe({
      next: data => {
        this.reporte = data;
        this.prepareCharts();
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  getTotalPorEspecie(especie: DTOEspecieConRazas): number {
    return especie.razas.reduce((acc, r) => acc + r.cantidad, 0);
  }

  getTotalGeneral(): number {
    return this.reporte.reduce((acc, especie) => acc + this.getTotalPorEspecie(especie), 0);
  }

  prepareCharts() {
    this.chartData = {};
    this.chartLabels = {};
    this.reporte.forEach(especie => {
      this.chartLabels[especie.especie] = especie.razas.map(r => r.raza);
      this.chartData[especie.especie] = [
        {
          data: especie.razas.map(r => r.cantidad),
          label: 'Cantidad',
          backgroundColor: this.chartColors.slice(0, especie.razas.length),
          borderColor: '#fff',
          borderWidth: 2,
        }
      ];
    });
  }
}
