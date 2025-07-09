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
import { Donations } from '../../../services/donations';

Chart.register(...registerables);

@Component({
  selector: 'app-recaudadoalbergue',
  standalone: true,
  imports: [BaseChartDirective, CommonModule],
  templateUrl: './recaudadoalbergue.html',
  styleUrl: './recaudadoalbergue.css',
})
export class Recaudadoalbergue implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  isLoading = true; // Nueva variable para controlar la carga
  hasData = false; // Nueva variable para controlar si hay datos
  constructor(private ds: Donations) {}
  ngOnInit(): void {
    this.isLoading = true;
    this.ds.getTotalRaisedByShelter().subscribe(
      (data) => {
        // Paleta de colores (puedes agregar más o generar aleatorios si hay más refugios)
        const colors = [
          '#95B5EA',
          '#373DA0',
          '#F7B801',
          '#EA5455',
          '#2DCE98',
          '#FF6F61',
          '#6A89CC',
          '#38ADA9',
          '#B33771',
          '#FD7272',
          '#1B9CFC',
          '#55E6C1',
          '#F97F51',
          '#3B3B98',
          '#FFC312',
          '#C4E538',
          '#12CBC4',
          '#FDA7DF',
          '#ED4C67',
          '#009432',
        ];
        this.barChartLabels = ['Total recaudado']; // Solo una barra por dataset
        this.barChartData = data.map((item, idx) => ({
          data: [item.totalRecaudado],
          label: item.nombreRefugio,
          backgroundColor: colors[idx % colors.length],
          borderColor: '#fff',
          borderWidth: 2,
        }));
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
