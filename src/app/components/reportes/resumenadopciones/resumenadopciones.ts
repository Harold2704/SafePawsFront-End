import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Chart, ChartDataset, ChartOptions, ChartType, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Shelters } from '../../../services/shelters';

Chart.register(...registerables);

@Component({
  selector: 'app-resumenadopciones',
  standalone: true,
  imports: [BaseChartDirective, CommonModule],
  templateUrl: './resumenadopciones.html',
  styleUrl: './resumenadopciones.css'
})
export class Resumenadopciones implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true },
    },
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  isLoading = true;
  hasData = false;
  constructor(private sS: Shelters) {}
  ngOnInit(): void {
    this.isLoading = true;
    this.sS.getSummaryAdoptionsByShelter().subscribe(
      (data) => {
        this.barChartLabels = data.map(item => item.nombreAlbergue);
        this.barChartData = [
          {
            data: data.map(item => item.mascotasAdoptadas),
            label: 'Adoptadas',
            backgroundColor: '#2DCE98',
            borderColor: '#fff',
            borderWidth: 2,
          },
          {
            data: data.map(item => item.mascotasNoAdoptadas),
            label: 'No adoptadas',
            backgroundColor: '#EA5455',
            borderColor: '#fff',
            borderWidth: 2,
          }
        ];
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
