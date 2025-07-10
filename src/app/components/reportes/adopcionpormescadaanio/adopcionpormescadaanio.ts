import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Adoptions } from '../../../services/adoptions';
import { DTOAdopcionesPorAnio } from '../../../models/DTOAdopcionesPorAnio';

@Component({
  selector: 'app-adopcionpormescadaanio',
  imports: [CommonModule],
  templateUrl: './adopcionpormescadaanio.html',
  styleUrls: ['./adopcionpormescadaanio.css'],
  providers: [Adoptions]
})
export class Adopcionpormescadaanio implements OnInit {
  adopcionesPorAnio: DTOAdopcionesPorAnio[] = [];
  loading: boolean = true;
  error: string = '';
  chartColors: string[] = [
    '#4dc9f6', '#f67019', '#f53794', '#537bc4', '#acc236',
    '#166a8f', '#00a950', '#58595b', '#8549ba', '#e6194b',
    '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4',
    '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080',
    '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3',
    '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000'
  ];

  constructor(private adoptionsService: Adoptions) {}

  ngOnInit() {
    this.adoptionsService.getPetsAdoptedPerMonthEachYear().subscribe({
      next: (data) => {
        this.adopcionesPorAnio = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los datos';
        this.loading = false;
      }
    });
  }

  getTotalPorAnio(anio: DTOAdopcionesPorAnio): number {
    return anio.meses.reduce((total, mes) => total + mes.totalAdopciones, 0);
  }
}
