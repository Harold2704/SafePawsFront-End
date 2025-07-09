import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { clients } from '../models/clients';
import { HttpClient } from '@angular/common/http';
import { users } from '../models/users';
import { DTOAdopcionesPorCliente } from '../models/DTOAdopcionesPorCliente';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class Clients {
  private url = `${base_url}/safepaws`;
  private listaCambio = new Subject<clients[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<clients[]>(`${this.url}/client/list`);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/client/delete/${id}`);
  }

  insert(so: clients) {
    return this.http.post(`${this.url}/client/register`, so);
  }

  setList(listaNueva: clients[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.http.get<clients>(`${this.url}/client/list/${id}`);
  }

  update(id: number, so: clients) {
    return this.http.put(`${this.url}/client/modification/${id}`, so);
  }

  getUsers() {
    return this.http.get<users[]>(`${this.url}/users/list`);
  }

  getAdoptionsByClient(): Observable<DTOAdopcionesPorCliente[]> {
    return this.http.get<DTOAdopcionesPorCliente[]>(`${this.url}/client/numberAdoptionRequestsForClient`);
  }
}
