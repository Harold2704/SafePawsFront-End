import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { adoptions } from '../models/adoptions';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base

@Injectable({
  providedIn: 'root'
})
export class Adoptions {
  private url = `${base_url}/safepaws`;
  private listaCambio = new Subject<adoptions[]>();

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<adoptions[]>(`${this.url}/adoption/list`);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/adoption/delete/${id}`);
  }
}
