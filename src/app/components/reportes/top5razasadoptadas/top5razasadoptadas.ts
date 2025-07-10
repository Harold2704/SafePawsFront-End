import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Chart, ChartDataset, ChartOptions, ChartType, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Pets } from '../../../services/pets';

Chart.register(...registerables);

@Component({
  selector: 'app-top5razasadoptadas',
  standalone: true,
  imports: [BaseChartDirective, CommonModule],
  templateUrl: './top5razasadoptadas.html',
  styleUrl: './top5razasadoptadas.css'
})
export class Top5razasadoptadas implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Oculta la leyenda para evitar "Cantidad de Adopciones"
      },
      tooltip: {
        enabled: true,
      },
    },
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'line';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  isLoading = true;
  hasData = false;
  rankingColors: string[] = [];
  rankingData: { raza: string, cantidad: number }[] = [];
  constructor(private pS: Pets) {}
  ngOnInit(): void {
    this.isLoading = true;
    this.pS.getTop5MostAdoptedBreeds().subscribe(
      (data) => {
        this.barChartLabels = data.map((item) => item.raza);
        const chartData = data.map((item) => item.totalAdoptadas);
        // Paleta de colores para los puntos
        const pointColors = [
          '#95B5EA',
          '#373DA0',
          '#F7B801',
          '#EA5455',
          '#2DCE98',
          '#FF6F61',
          '#6A89CC',
          '#38ADA9',
          '#FFC312',
          '#C4E538',
          '#12CBC4',
          '#FDA7DF',
          '#ED4C67',
          '#009432',
        ];
        this.barChartData = [
          {
            data: chartData,
            label: '', // Sin texto para la leyenda
            backgroundColor: '#95B5EA',
            borderColor: '#1a237e', // Azul fuerte para la línea
            borderWidth: 3,
            pointBackgroundColor: pointColors.slice(0, chartData.length),
            pointBorderColor: '#fff',
            pointRadius: 6,
            pointHoverRadius: 8,
          },
        ];
        // Ranking para la tabla
        this.rankingColors = pointColors.slice(0, chartData.length);
        this.rankingData = data.map((item, i) => ({ raza: item.raza, cantidad: item.totalAdoptadas }));
        // Mostrar la leyenda personalizada con los nombres de las razas y sus colores
        this.barChartOptions.plugins = {
          ...this.barChartOptions.plugins,
          legend: {
            display: true,
            labels: {
              generateLabels: (chart: any) => {
                return this.barChartLabels.map((raza, i) => ({
                  text: raza,
                  fillStyle: pointColors[i],
                  strokeStyle: '#fff',
                  lineWidth: 2,
                  hidden: false,
                  index: i,
                }));
              },
              font: {
                weight: 'bold',
                size: 14,
              },
            },
          },
        };
        this.hasData = chartData.length > 0;
        this.isLoading = false;
      },
      () => {
        this.hasData = false;
        this.isLoading = false;
      }
    );
  }
}
