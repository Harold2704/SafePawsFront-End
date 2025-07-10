import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Pets } from '../../../services/pets';

@Component({
  selector: 'app-alberguesnollenos',
  standalone: true,
  imports: [BaseChartDirective, CommonModule],
  templateUrl: './alberguesnollenos.html',
  styleUrl: './alberguesnollenos.css'
})
export class Alberguesnollenos implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = false;
  barChartData: ChartDataset[] = [];
  isLoading = true;
  hasData = false;
  colorLabels: string[] = [];
  constructor(private pS: Pets) {}
  ngOnInit(): void {
    this.isLoading = true;
    this.pS.getShelterNotFull().subscribe(
      (data) => {
        const colors = [
          '#95B5EA', '#373DA0', '#F7B801', '#EA5455', '#2DCE98',
          '#FF6F61', '#6A89CC', '#38ADA9', '#B33771', '#FD7272',
          '#1B9CFC', '#55E6C1', '#F97F51', '#3B3B98', '#FFC312',
          '#C4E538', '#12CBC4', '#FDA7DF', '#ED4C67', '#009432',
        ];
        this.barChartLabels = data.map((item: any) => item.nombreAlbergue);
        this.colorLabels = this.barChartLabels.map((_, idx) => colors[idx % colors.length]);
        const cantidadMascotasData = data.map((item: any) => item.cantidadMascotas);
        const capacidadData = data.map((item: any) => item.capacidad);
        const espacioVacioData = data.map((item: any) => Math.max(item.capacidad - item.cantidadMascotas, 0));
        this.barChartData = [
          {
            data: cantidadMascotasData,
            label: 'Cantidad de mascotas',
            backgroundColor: this.colorLabels,
            borderColor: this.colorLabels,
            borderWidth: 2,
            barPercentage: 0.7,
            categoryPercentage: 0.7,
            stack: 'total',
          },
          {
            data: espacioVacioData,
            label: 'Espacio disponible',
            backgroundColor: '#e0e0e0',
            borderColor: this.colorLabels,
            borderWidth: 2,
            barPercentage: 0.7,
            categoryPercentage: 0.7,
            stack: 'total',
          },
        ];
        this.barChartOptions = {
          responsive: true,
          plugins: {
            legend: { display: true },
          },
          scales: {
            x: { stacked: true },
            y: { stacked: true },
          },
        };
        this.hasData = data.length > 0;
        this.isLoading = false;
      },
      () => {
        this.hasData = false;
        this.isLoading = false;
      }
    );
  }
}
