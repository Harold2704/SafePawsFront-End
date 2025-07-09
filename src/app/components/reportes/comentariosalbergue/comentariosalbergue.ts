import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Comments } from '../../../services/comments';
import { DTOComentariosPorAlbergue } from '../../../models/DTOComentariosPorAlbergue';

interface ComentariosAgrupados {
  nombreAlbergue: string;
  comentarios: {
    comentario: string;
    fechaComentario: Date;
    calificacion: number;
  }[];
}

@Component({
  selector: 'app-comentariosalbergue',
  templateUrl: './comentariosalbergue.html',
  styleUrl: './comentariosalbergue.css',
  providers: [Comments],
  imports: [CommonModule, DatePipe],
})
export class Comentariosalbergue implements OnInit {
  comentariosAgrupados: ComentariosAgrupados[] = [];
  isLoading: boolean = true;

  constructor(private commentsService: Comments) {}

  ngOnInit() {
    this.isLoading = true;
    this.commentsService.getCommentsByShelter().subscribe(
      (data: DTOComentariosPorAlbergue[]) => {
        this.comentariosAgrupados = this.agruparPorAlbergue(data);
        this.isLoading = false;
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  private agruparPorAlbergue(
    data: DTOComentariosPorAlbergue[]
  ): ComentariosAgrupados[] {
    const agrupados: {
      [key: string]: {
        comentario: string;
        fechaComentario: Date;
        calificacion: number;
      }[];
    } = {};
    data.forEach((item) => {
      if (!agrupados[item.nombreAlbergue]) {
        agrupados[item.nombreAlbergue] = [];
      }
      agrupados[item.nombreAlbergue].push({
        comentario: item.comentario,
        fechaComentario: new Date(item.fechaComentario),
        calificacion: item.calificacion,
      });
    });
    return Object.keys(agrupados).map((nombreAlbergue) => ({
      nombreAlbergue,
      comentarios: agrupados[nombreAlbergue],
    }));
  }
}
