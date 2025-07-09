import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { shelters } from '../models/shelters';
import { HttpClient } from '@angular/common/http';
import { users } from '../models/users';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class Shelters {
  private url = `${base_url}/safepaws`;
  private listaCambio = new Subject<shelters[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<shelters[]>(`${this.url}/shelter/list`);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/shelter/delete/${id}`);
  }

  insert(so: shelters) {
    return this.http.post(`${this.url}/shelter/register`, so);
  }

  setList(listaNueva: shelters[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.http.get<shelters>(`${this.url}/shelter/list/${id}`);
  }

  update(id: number, so: shelters) {
    return this.http.put(`${this.url}/shelter/modification/${id}`, so);
  }

  getUsers() {
    return this.http.get<users[]>(`${this.url}/users/list`);
  }
}
