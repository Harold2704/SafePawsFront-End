import { Component, OnInit } from '@angular/core';
import {
  Chart,
  ChartDataset,
  ChartOptions,
  ChartType,
  registerables,
} from 'chart.js';
import { Donations } from '../../../services/donations';
import { BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';

Chart.register(...registerables);

@Component({
  selector: 'app-donacionesmetodopago',
  standalone: true,
  imports: [BaseChartDirective, CommonModule],
  templateUrl: './donacionesmetodopago.html',
  styleUrl: './donacionesmetodopago.css',
})
export class Donacionesmetodopago implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'pie';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  isLoading = true;
  hasData = false;
  constructor(private dS: Donations) {}
  ngOnInit(): void {
    this.isLoading = true;
    this.dS.getAmountDonationByMethodPay().subscribe(
      (data) => {
        this.barChartLabels = data.map((item) => item.metodoPago);
        const chartData = data.map((item) => item.totalDonaciones);
        this.barChartData = [
          {
            data: chartData,
            label: 'Cantidad de Donaciones',
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
