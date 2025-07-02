import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { comments } from '../models/comments';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base

@Injectable({
  providedIn: 'root'
})
export class Comments {
  private url = `${base_url}/safepaws`;
  private listaCambio = new Subject<comments[]>();

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<comments[]>(`${this.url}/comments/list`);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/comments/delete/${id}`);
  }
}
