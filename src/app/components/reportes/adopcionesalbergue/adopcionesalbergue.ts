import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Chart, ChartDataset, ChartOptions, ChartType, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Pets } from '../../../services/pets';

Chart.register(...registerables);

@Component({
  selector: 'app-adopcionesalbergue',
  standalone: true,
  imports: [BaseChartDirective, CommonModule],
  templateUrl: './adopcionesalbergue.html',
  styleUrl: './adopcionesalbergue.css'
})
export class Adopcionesalbergue implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
    indexAxis: 'y',
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = false;
  barChartData: ChartDataset[] = [];
  isLoading = true;
  hasData = false;
  constructor(private pS: Pets) {}
  ngOnInit(): void {
    this.isLoading = true;
    this.pS.getPetAdoptedByShelter().subscribe(
      (data) => {
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
        this.barChartLabels = data.map(
          (item: any) => item.nombreAlbergue
        );
        this.barChartData = [
          {
            data: data.map((item: any) => item.totalMascotasAdoptadas),
            label: 'Cantidad de mascotas adoptadas',
            backgroundColor: this.barChartLabels.map(
              (_, idx) => colors[idx % colors.length]
            ),
            borderColor: '#fff',
            borderWidth: 2,
          },
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