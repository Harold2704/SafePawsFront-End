import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { vaccines } from '../models/vaccines';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class Vaccines {
  private url = `${base_url}/safepaws`;
  private listaCambio = new Subject<vaccines[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<vaccines[]>(`${this.url}/vaccine/list`);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/vaccine/delete/${id}`);
  }

  insert(so: vaccines) {
    return this.http.post(`${this.url}/vaccine/register`, so);
  }

  setList(listaNueva: vaccines[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.http.get<vaccines>(`${this.url}/vaccine/list/${id}`);
  }

  update(id: number, so: vaccines) {
    return this.http.put(`${this.url}/vaccine/modification/${id}`, so);
  }
}
