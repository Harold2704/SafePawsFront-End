import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { vaccinepets } from '../models/vaccinepets';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class Vaccinepets {
  private url = `${base_url}/safepaws`;
  private listaCambio = new Subject<vaccinepets[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<vaccinepets[]>(`${this.url}/vaccinePet/list`);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/vaccinePet/delete/${id}`);
  }

  insert(so: vaccinepets) {
    return this.http.post(`${this.url}/vaccinePet/register`, so);
  }

  setList(listaNueva: vaccinepets[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }
}
