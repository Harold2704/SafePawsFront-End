import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { races } from '../models/races';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class Races {
  private url = `${base_url}/safepaws`;
  private listaCambio = new Subject<races[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<races[]>(`${this.url}/race/list`);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/race/delete/${id}`);
  }

  insert(so: races) {
    return this.http.post(`${this.url}/race/register`, so);
  }

  setList(listaNueva: races[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.http.get<races>(`${this.url}/race/list/${id}`);
  }

  update(id: number, so: races) {
    return this.http.put(`${this.url}/race/modification/${id}`, so);
  }
}
