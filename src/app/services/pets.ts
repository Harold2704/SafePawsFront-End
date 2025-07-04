import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { pets } from '../models/pets';
import { HttpClient } from '@angular/common/http';
import { shelters } from '../models/shelters';
import { races } from '../models/races';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class Pets {
  private url = `${base_url}/safepaws`;
  private listaCambio = new Subject<pets[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<pets[]>(`${this.url}/pet/list`);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/pet/delete/${id}`);
  }

  insert(so: pets) {
    return this.http.post(`${this.url}/pet/register`, so);
  }

  setList(listaNueva: pets[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  getShelters() {
    return this.http.get<shelters[]>(`${this.url}/shelter/list`);
  }

  getRaces() {
    return this.http.get<races[]>(`${this.url}/race/list`);
  }
}
