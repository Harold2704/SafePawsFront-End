import { Component } from '@angular/core';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
})
export class GraficoComponent {
  pieChartLabels = ['Leisy', 'Ana', 'Luis', 'Carlos'];
  pieChartData = [25, 15, 10, 5];
  pieChartType = 'pie';
}
