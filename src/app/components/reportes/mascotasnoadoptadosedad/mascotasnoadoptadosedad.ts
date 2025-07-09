import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Chart, ChartDataset, ChartOptions, ChartType, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Pets } from '../../../services/pets';

Chart.register(...registerables);

@Component({
  selector: 'app-mascotasnoadoptadosedad',
  standalone: true,
  imports: [BaseChartDirective, CommonModule],
  templateUrl: './mascotasnoadoptadosedad.html',
  styleUrl: './mascotasnoadoptadosedad.css'
})
export class Mascotasnoadoptadosedad implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'doughnut';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  isLoading = true;
  hasData = false;
  constructor(private pS: Pets) {}
  ngOnInit(): void {
    this.isLoading = true;
    this.pS.getPetsNotAdoptedByAge().subscribe(
      (data) => {
        this.barChartLabels = data.map((item) => item.grupoEdad);
        const chartData = data.map((item) => item.cantidad);
        this.barChartData = [
          {
            data: chartData,
            label: 'Cantidad de Mascotas No Adoptadas por Edad',
            backgroundColor: [
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
            ],
            borderColor: '#fff',
            borderWidth: 2,
          },
        ];
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
